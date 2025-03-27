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

/**
 * The save function defines the way in which the different attributes should be
 * combined into the final markup, which is then serialized into post_content.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function Save(props) {
	const blockProps = useBlockProps.save();
	const { attributes, context } = props;
	const audioSrc = blockProps.src || attributes?.src;

	console.log("player.save: blockProps", blockProps);
	console.log("player.save: props", props);

	return (
		<div {...blockProps} src={audioSrc}>
			<InnerBlocks.Content />
		</div>
	);
}
