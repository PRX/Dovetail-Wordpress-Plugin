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
import { useBlockProps } from "@wordpress/block-editor";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

import { cn, formatDuration } from "@/utils";
import { DtpcTimeCurrent } from "@/components";

export default function Edit(props) {
	const { attributes, context } = props;
	const { className, ...rest } = useBlockProps();
	const blockProps = {
		...rest,
		className: cn({}, className),
	};
	const currentTime =
		(context?.["dovetail-podcasts-player/duration"] || 600) * 0.3;

	console.log("time current: props", props);
	console.log("time current: attributes", attributes);
	console.log("time current: context", context);

	return (
		<DtpcTimeCurrent {...blockProps}>
			{formatDuration(currentTime)}
		</DtpcTimeCurrent>
	);
}
