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
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";
import { useSelect } from "@wordpress/data";
import { DtpcPlayer } from "@/components";
import "dovetail-podcasts-player-web-components";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit(props) {
	const blockProps = useBlockProps();
	const { attributes, context } = props;
	const { post_id, post_type, src, duration } = attributes;
	const meta = useSelect((select) => {
		const { getEditedEntityRecord } = select("core");
		const record = getEditedEntityRecord(
			"postType",
			post_type || context.postType,
			post_id || context.postId,
		);
		return record.meta?._dovetail_podcasts_episode;
	});
	const audioSrc = src || meta?.dovetail?.enclosure?.href;
	const audioDuration = duration || meta?.dovetail?.enclosure?.duration;

	console.log("player.edit: blockProps", blockProps);
	console.log("player.edit: props", props);
	console.log("player.edit: meta", meta);

	return (
		<DtpcPlayer {...blockProps} src={audioSrc}>
			<InnerBlocks />
		</DtpcPlayer>
	);
}
