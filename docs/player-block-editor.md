# Add Player Using Block Editor

Sites using bock themes can easily add the _Dovetail Podcasts Player_ to page templates or to post content using the block editor. Player block can be added to any block content, but will only render if the template is for a post or list of posts that are setup to be podcast episode post types and that post has episode audio, or a fixed audio URL is set on the player block.

Edit page templates by going to **Appearance > Editor**, then **Templates**. Select a template and add the _Dovetail Podcasts Player_ block where you want it. If all you want is the default player, you are done. Save the template and browse your site to see it in action.

## Custom Layouts

Any block can be added inside the player block. Any inner block that is not a player component will always be rendered, even if the post does not have podcast episode audio. Player component blocks can only be added inside the player block.

Start your custom layout with one of Wordpress's core layout blocks, such as a _Row_ or _Stack_ block. Then add any player component block or theme blocks you want (_Play Button_ is a good starting point). You can also nest other layout blocks for more complicated layouts.

If you have an existing layout that you want to add player control blocks to, add the _Dovetail Podcast Player_ block next to the layout block, not inside it, then select the layout block and drag it into the player block. You should now be able to add player component blocks to that layout.
