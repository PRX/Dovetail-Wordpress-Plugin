# Configure Settings

Dovetail Podcasts does its best to be as easy to setup as possible and should work for most Wordpress podcast sites out-of-the-box. However, we all know not all Wordpress sites are the same, so there are a couple important settings to get Dovetail Podcasts working for yours.

## Podcasts Post Types

By default, Dovetail Podcasts will treat Posts as podcast episodes, and provide a post editor meta box to add episode information to the post. All available post types that are compatible with the meta box will be listed. If the post type you use for podcast episodes is not listed, makes ure it is configured to support custom fields.

## Delete Uploaded Media After Publishing

Dovetail Podcasts will use your Wordpress Media Library to upload audio files to the server and connect those files with the post. Dovetail will retrieve the audio file from your server, process it for distribution, and then host the audio URL used in your feeds. This behavior is similar what media offloading plugin do to store media files in cloud storage, such as AWS S3 or Google Cloud.

Enable this option if you would like to reduce storage costs for your site hosting and do not use a media offloading plugin. When podcast episode posts are published, the audio in your media library will be deleted.
