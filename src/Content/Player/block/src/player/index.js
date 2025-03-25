/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from "@wordpress/blocks";

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

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
	usesContext: ["postId", "postType"],

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save: Save,

	icon: (
		<svg
			width="121"
			height="121"
			viewBox="0 0 121 121"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M91.0268 60.4631L119.767 31.7232C120.233 31.257 120.496 30.6234 120.496 29.9637C120.496 29.304 120.233 28.6704 119.767 28.2042L92.7864 1.22389C92.3201 0.757069 91.6865 0.494574 91.0268 0.494574C90.3672 0.494574 89.7336 0.757069 89.2673 1.22389L60.5275 29.9637L60.4644 29.9007L31.7246 1.16371C31.2584 0.69689 30.6248 0.434395 29.9651 0.434395C29.3054 0.434395 28.6718 0.69689 28.2056 1.16371L1.22529 28.144C0.758467 28.6103 0.495972 29.2439 0.495972 29.9035C0.495972 30.5632 0.758467 31.1968 1.22529 31.6631L30.0253 60.4631L1.22529 89.2631C0.758467 89.7293 0.495972 90.3629 0.495972 91.0226C0.495972 91.6823 0.758467 92.3158 1.22529 92.7821L28.2056 119.757C28.6718 120.223 29.3054 120.486 29.9651 120.486C30.6248 120.486 31.2584 120.223 31.7246 119.757L52.0537 99.4276C52.0537 99.4276 52.7099 86.9562 38.0664 68.507L60.5218 90.9595L89.2673 119.702C89.7336 120.169 90.3672 120.432 91.0268 120.432C91.6865 120.432 92.3201 120.169 92.7864 119.702L119.767 92.7219C120.233 92.2557 120.496 91.6221 120.496 90.9624C120.496 90.3027 120.233 89.6691 119.767 89.2029L91.0268 60.4631Z"
				fill="currentColor"
			/>
		</svg>
	),

	variations: [
		{
			name: "dovetail-podcasts-player--button",
			title: "Dovetail One-Button Player",
			description: "Just the play button.",
			attributes: {
				backgroundColor: "transparent",
			},
			innerBlocks: [
				[
					"dovetail-podcasts/play-button",
					{
						style: {
							color: {
								background: "var:preset|color|contrast",
								text: "var:preset|color|base",
							},
							spacing: {
								padding: {
									top: "var:preset|spacing|20",
									bottom: "var:preset|spacing|20",
									left: "var:preset|spacing|20",
									right: "var:preset|spacing|20",
								},
							},
						},
					},
				],
			],
			example: {
				innerBlocks: [
					{
						name: "dovetail-podcasts/play-button",
						attributes: {
							style: {
								color: {
									background: "var:preset|color|contrast",
									text: "var:preset|color|base",
								},
								spacing: {
									padding: {
										top: "var:preset|spacing|20",
										bottom: "var:preset|spacing|20",
										left: "var:preset|spacing|20",
										right: "var:preset|spacing|20",
									},
								},
							},
						},
					},
				],
			},
			isDefault: true,
		},
	],
});
