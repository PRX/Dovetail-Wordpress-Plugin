/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType, registerBlockCollection } from "@wordpress/blocks";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./style.scss";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import Save from "./save";
import metadata from "./block.json";
import { PrxLogo } from "@/components/icons/prx-logo";

registerBlockCollection("dovetail-podcasts-player", {
	icon: <PrxLogo />,
	title: "Dovetail Podcasts Player",
});

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
	providesContext: {
		"dovetail-podcasts-player/duration": "duration",
	},

	usesContext: ["postId", "postType"],

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save: Save,

	icon: <PrxLogo />,

	variations: [
		{
			name: "dovetail-podcasts-player--button",
			title: "Dovetail One-Button Player",
			description: "Just the play button.",
			attributes: {
				backgroundColor: "transparent",
			},
			innerBlocks: [["dovetail-podcasts/play-button"]],
			example: {
				innerBlocks: [
					{
						name: "dovetail-podcasts/play-button",
					},
				],
			},
			isDefault: false,
		},
	],
});
