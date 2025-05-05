/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	BlockControls,
	InnerBlocks,
	__experimentalLinkControl as LinkControl,
	__experimentalLinkControlSearchInput as LinkControlSearchInput,
	useBlockProps,
	useBlockEditContext,
} from "@wordpress/block-editor";
import {
	Placeholder,
	Popover,
	ToolbarGroup,
	ToolbarButton,
	CardFooter,
	Flex,
	FlexItem,
	FlexBlock,
	__experimentalText as Text,
} from "@wordpress/components";
import { FileAudio2Icon } from "lucide-react";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

import apiFetch from "@wordpress/api-fetch";
import { useEntityProp, useEntityRecord } from "@wordpress/core-data";
import { DtpcPlayer } from "@/components";
import DtpcPlayButton from "../play-button/edit";
import DtpcProgressBar from "../progress-bar/edit";
import DtpcTimeDisplay from "../time-display/edit";
import DtpcVolumeControls from "../volume-controls/edit";
import { useMemo, useState, useEffect } from "react";
import { PrxLogo } from "@/components/icons/prx-logo";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit(props) {
	const { isSelected } = useBlockEditContext();
	const [generalSettings] = useEntityProp(
		"root",
		"site",
		"dovetail_podcasts_settings-general",
	);
	const { post_types } = generalSettings || {};
	const blockProps = useBlockProps();
	const { attributes, context, setAttributes } = props;
	const { post_id, post_type, src } = attributes;
	const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false);
	const { record, isResolving } = useEntityRecord(
		"postType",
		post_type,
		post_id,
	);
	const memoizedLinkValue = useMemo(() => {
		if (!post_id && src)
			return {
				type: "link",
				title: src,
				url: src,
				id: src,
			};

		if (!isResolving && record) {
			const { title, meta } = record;
			const { enclosure, dovetail } = meta?._dovetail_podcasts_episode || {};

			if (enclosure) {
				setAttributes({
					src: enclosure.url,
				});

				return {
					kind: "post-type",
					type: post_type,
					id: post_id,
					title: dovetail?.cleanTitle || title.rendered,
					url: enclosure.url,
				};
			}
		}

		return null;
	}, [post_id, src, isResolving, record]);
	const suggestionsQuery = {
		type: "post",
		subtype: Object.values(post_types || { post: "post" }),
	};

	console.log("player.edit: blockProps", blockProps);
	console.log("player.edit: props", props);
	console.log("player.edit: record", record);
	console.log("player.edit: memoizedLinkValue", memoizedLinkValue);

	function handleLinkChange(newLink) {
		console.log("player.edit: newLink", newLink);
		const atts =
			newLink.kind === "post-type"
				? {
						post_id: newLink.id,
						post_type: newLink.type,
						src: null,
						duration: null,
				  }
				: {
						post_id: null,
						post_type: null,
						src: newLink.url,
						duration: null,
				  };

		setAttributes(atts);
	}

	function handleLinkRemove() {
		setAttributes({
			post_id: null,
			post_type: null,
			src: null,
			duration: null,
		});
	}

	function toggleLinkPopover() {
		setIsLinkPopoverOpen((c) => !c);
	}

	useEffect(() => {
		if (!src) return;

		const audio = new Audio();
		audio.preload = "metadata";
		audio.addEventListener("loadedmetadata", (e) => {
			setAttributes({
				duration: e.target.duration,
			});
		});
		audio.src = src;
	}, [src, setAttributes]);

	useEffect(() => {
		if (!isSelected) {
			setIsLinkPopoverOpen(false);
		}
	}, [isSelected, setIsLinkPopoverOpen]);

	useEffect(() => {
		if (record && !isResolving && !memoizedLinkValue) {
			setIsLinkPopoverOpen(false);
		}
	}, [record, isResolving, memoizedLinkValue]);

	return (
		<DtpcPlayer {...blockProps}>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						label={__("Set Player Audio", "dovetail-podcasts")}
						showTooltip
						icon={<FileAudio2Icon style={{ fill: "none" }} />}
						onClick={() => toggleLinkPopover()}
						isActive={!!memoizedLinkValue}
					/>
					{isLinkPopoverOpen && (
						<Popover variant="toolbar">
							<LinkControl
								key={blockProps.id}
								value={memoizedLinkValue}
								showSuggestions={true}
								suggestionsQuery={suggestionsQuery}
								onChange={handleLinkChange}
								onRemove={() => handleLinkRemove()}
								renderControlBottom={() => (
									<CardFooter>
										<Text>
											{__(
												"Player will automatically use audio from the current podcast episode post. Set this to use audio from another podcasts episode post or an external URL. The player will always play the selected audio.",
												"dovetail-podcasts",
											)}
										</Text>
									</CardFooter>
								)}
							/>
						</Popover>
					)}
				</ToolbarGroup>
			</BlockControls>
			<div className="main">
				<InnerBlocks
					placeholder={
						<Placeholder
							icon={<PrxLogo size={20} />}
							label={__("Dovetail Podcasts Player", "dovetail-podcasts")}
							instructions={__(
								"Build out your player by adding Dovetail Podcasts Player components. Row and Stack blocks can be used to layout the components, or any other blocks you want in your player.",
								"dovetail-podcasts",
							)}
						>
							<Flex align="center" expand>
								<FlexItem>
									<DtpcPlayButton />
								</FlexItem>
								<FlexBlock>
									<DtpcProgressBar />
								</FlexBlock>
								<FlexItem>
									<DtpcTimeDisplay />
								</FlexItem>
								<FlexItem>
									<DtpcVolumeControls />
								</FlexItem>
							</Flex>
						</Placeholder>
					}
				/>
			</div>
		</DtpcPlayer>
	);
}
