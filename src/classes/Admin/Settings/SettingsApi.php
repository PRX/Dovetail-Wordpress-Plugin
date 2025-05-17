<?php
/**
 * DovetailPodcasts Settings API class
 *
 * @package DovetailPodcasts\Admin\Settings
 */

namespace DovetailPodcasts\Admin\Settings;

use Defuse\Crypto\Crypto;
use Defuse\Crypto\Key;

/**
 * Class SettingsApi
 *
 * This settings class is based on the WordPress Settings API Class v1.3 from Tareq Hasan of WeDevs
 *
 * @see     https://github.com/tareq1988/wordpress-settings-api-class
 * @author  Tareq Hasan <tareq@weDevs.com>
 * @link    https://tareq.co Tareq Hasan
 *
 * @package DovetailPodcasts\Admin\Settings
 */
class SettingsApi {

	/**
	 * Encryption key.
	 *
	 * @var \Defuse\Crypto\Key
	 */
	private $key;

	/**
	 * Page or pages settings are registered to.
	 *
	 * @var string[]
	 */
	public $page_slugs;

	/**
	 * Settings pages section keys array.
	 *
	 * @var array<string,array<string,mixed>>
	 */
	protected $settings_pages = [];

	/**
	 * Settings sections array.
	 *
	 * @var array<string,array<string,mixed>>
	 */
	protected $settings_sections = [];

	/**
	 * Settings fields array.
	 *
	 * @var array<string,array<string,mixed>[]>
	 */
	protected $settings_fields = [];

	/**
	 * Class construct.
	 *
	 * @param array<string,mixed> $args Configuration arguments array.
	 *      `page_slug` - __sting|string[]__ Slug(s) of the page(s) the settings will be shown on.
	 */
	public function __construct( array $args = null ) {
		$key_ascii = get_option( 'dovetail_podcasts_key' );

		if ( ! empty( $key_ascii ) ) {
			$this->key = Key::loadFromAsciiSafeString( $key_ascii );
		}

		if ( is_array( $args ) && isset( $args['page_slugs'] ) ) {
			$this->page_slugs = is_array( $args['page_slugs'] ) ? $args['page_slugs'] : [ $args['page_slugs'] ];
		}

		add_action( 'admin_enqueue_scripts', [ $this, 'admin_enqueue_scripts' ] );
	}

	/**
	 * Returns the settings sections.
	 *
	 * @return array<string,array<string,mixed>>
	 */
	public function get_settings_sections() {
		return $this->settings_sections;
	}

	/**
	 * Returns the settings fields.
	 *
	 * @return array<string,array<string,mixed>[]>
	 */
	public function get_settings_fields() {
		return $this->settings_fields;
	}

	/**
	 * Enqueue scripts and styles.
	 *
	 * @param string $hook_suffix The current admin page.
	 *
	 * @return void
	 */
	public function admin_enqueue_scripts( string $hook_suffix ) {

		// If the page is not the configured page (if set), bail.
		if ( is_array( $this->page_slugs ) ) {
			$valid_hook_suffixes = [];
			foreach ( $this->page_slugs as $slug ) {
				$valid_hook_suffixes[] = "toplevel_page_$slug";
			}
			if ( ! in_array( $hook_suffix, $valid_hook_suffixes, true ) ) {
				return;
			}
		} else {
			// Class is being used on a non-settings page, probably to use helper methods.
			// Bail since we don't need to enqueue scripts in this case.
			return;
		}

		wp_enqueue_style( 'spectrum', DTPODCASTS_PLUGIN_URL . 'assets/vendor/spectrum/spectrum.css', [], 'v1.8.1' );
		wp_enqueue_style( DTPODCASTS_SETTINGS_SECTION_PREFIX . '-settings', DTPODCASTS_PLUGIN_URL . 'assets/css/admin-settings.css', [ 'wp-color-picker' ], DTPODCASTS_VERSION );
		wp_enqueue_media();
		wp_enqueue_script( 'spectrum', DTPODCASTS_PLUGIN_URL . 'assets/vendor/spectrum/spectrum.js', [ 'jquery' ], 'v1.8.1', [ 'strategy' => 'defer' ] );
		wp_enqueue_script( DTPODCASTS_SETTINGS_SECTION_PREFIX . '-settings', DTPODCASTS_PLUGIN_URL . 'assets/js/admin-settings.js', [ 'wp-color-picker', 'jquery' ], DTPODCASTS_VERSION, [ 'strategy' => 'defer' ] );
		wp_enqueue_script( DTPODCASTS_SETTINGS_SECTION_PREFIX . '-player', DTPODCASTS_PLUGIN_URL . 'build/blocks/player/player/view.js', [], DTPODCASTS_VERSION, [ 'strategy' => 'defer' ] );

		// Action to enqueue scripts on the Dovetail Podcasts Settings page.
		do_action( 'dovetail_podcasts_settings_enqueue_scripts' );
	}

	/**
	 * Set settings sections.
	 *
	 * @param string              $slug    Setting Section Slug.
	 * @param array<string,mixed> $section Setting section config.
	 *
	 * @return \DovetailPodcasts\Admin\Settings\SettingsApi
	 */
	public function register_section( string $slug, array $section ) {
		$section['id'] = $slug;

		if ( ! isset( $section['parent'] ) ) {
			$this->page_slugs[ $section['id'] ] = $section['id'];
		} else {
			// Wrap sub-section in <details> element.
			$section['before_section'] = sprintf( '<details class="dovetail-section"><summary><h2>%1$s</h2></summary><div class="dovetail-forms">', $section['title'] );
			$section['after_section']  = '</div></details>';

			// Remove section title since we are adding in `before_section` HTML.
			// Set to empty string since the property is required, but will not render if falsy.
			$section['title'] = '';
		}

		$this->settings_sections[ $slug ] = $section;

		return $this;
	}

	/**
	 * Register fields to a section.
	 *
	 * @param string                $section The slug of the section to register a field to.
	 * @param array<string,mixed>[] $fields  Settings fields array.
	 *
	 * @return \DovetailPodcasts\Admin\Settings\SettingsApi
	 */
	public function register_fields( string $section, array $fields ) {
		foreach ( $fields as $field ) {
			$this->register_field( $section, $field );
		}

		return $this;
	}

	/**
	 * Register a field to a section.
	 *
	 * @param string              $section The slug of the section to register a field to.
	 * @param array<string,mixed> $field   The config for the field being registered.
	 *
	 * @return \DovetailPodcasts\Admin\Settings\SettingsApi
	 */
	public function register_field( string $section, array $field ) {
		$defaults = [
			'name'  => '',
			'label' => '',
			'desc'  => '',
			'type'  => 'text',
		];

		$field_config = wp_parse_args( $field, $defaults );

		// Get the field name before the filter is passed.
		$field_name = $this->get_field_name( $field_config );

		// Unset it, as we don't want it to be filterable.
		unset( $field_config['name'] );

		/**
		 * Filter the setting field config.
		 *
		 * @param array<string,mixed>  $field_config The field config for the setting.
		 * @param string               $field_name   The name of the field (not filterable in the config).
		 * @param string               $section      The slug of the section the field is registered to.
		 */
		$field = apply_filters( 'dovetail_podcasts_setting_field_config', $field_config, $field_name, $section );

		// Add the field name back after the filter has been applied.
		$field['name'] = $field_name;

		// Add the field to the section.
		$this->settings_fields[ $section ][] = $field;

		return $this;
	}

	/**
	 * Initialize and registers the settings sections and fields to WordPress.
	 *
	 * Usually this should be called at `admin_init` hook.
	 *
	 * This function gets the initiated settings sections and fields. Then
	 * registers them to WordPress and ready for use.
	 *
	 * @return void
	 */
	public function admin_init() {
		// Action that fires when settings are being initialized.
		do_action( 'dovetail_podcasts_init_settings', $this );

		/**
		 * Filter the settings sections.
		 *
		 * @param array<string,array<string,mixed>> $settings_sections The registered settings sections.
		 */
		$settings_sections = apply_filters( 'dovetail_podcasts_settings_sections', $this->settings_sections );

		foreach ( $settings_sections as $id => $section ) {
			$page_id = DTPODCASTS_SETTINGS_SECTION_PREFIX . $id;

			if ( isset( $section['parent'] ) ) {
				$page_id = DTPODCASTS_SETTINGS_SECTION_PREFIX . $section['parent'];
			}

			if ( false === get_option( $page_id ) ) {
				add_option( $page_id );
			}

			if ( isset( $section['desc'] ) && ! empty( $section['desc'] ) ) {
				$section['desc'] = '<div class="inside">' . $section['desc'] . '</div>';
				$callback        = static function () use ( $section ) {
					echo wp_kses( str_replace( '"', '\"', $section['desc'] ), self::get_allowed_wp_kses_html() );
				};
			} elseif ( isset( $section['callback'] ) ) {
				$callback = $section['callback'];
			} else {
				$callback = null;
			}

			add_settings_section( $id, $section['title'], $callback, $page_id, $section );
		}

		// Register settings fields.
		foreach ( $this->settings_fields as $section_id => $fields ) {
			$page_id = DTPODCASTS_SETTINGS_SECTION_PREFIX . $section_id;

			$section = $settings_sections[ $section_id ];

			if ( isset( $section['parent'] ) ) {
				$page_id = DTPODCASTS_SETTINGS_SECTION_PREFIX . $section['parent'];
			}

			foreach ( $fields as $option ) {
				$name             = $this->get_field_name( $option );
				$type             = isset( $option['type'] ) ? $option['type'] : 'text';
				$label            = isset( $option['label'] ) ? $option['label'] : '';
				$callback         = isset( $option['callback'] ) ? $option['callback'] : [
					$this,
					'callback_' . $type,
				];
				$component_states = isset( $option['component_states'] ) ? $option['component_states'] : null;
				$css_states       = isset( $option['css_states'] ) ? $option['css_states'] : null;

				$args = [
					'id'                => $name,
					'class'             => isset( $option['class'] ) ? $option['class'] : $name,
					'label_for'         => "{$page_id}[{$name}]",
					'desc'              => isset( $option['desc'] ) ? $option['desc'] : '',
					'name'              => $label,
					'section'           => $page_id,
					'size'              => isset( $option['size'] ) ? $option['size'] : null,
					'options'           => isset( $option['options'] ) ? $option['options'] : '',
					'std'               => isset( $option['default'] ) ? $option['default'] : '',
					'sanitize_callback' => isset( $option['sanitize_callback'] ) ? $option['sanitize_callback'] : '',
					'type'              => $type,
					'placeholder'       => isset( $option['placeholder'] ) ? $option['placeholder'] : '',
					'min'               => isset( $option['min'] ) ? $option['min'] : '',
					'max'               => isset( $option['max'] ) ? $option['max'] : '',
					'step'              => isset( $option['step'] ) ? $option['step'] : '',
					'disabled'          => isset( $option['disabled'] ) ? (bool) $option['disabled'] : false,
					'value'             => isset( $option['value'] ) ? $option['value'] : null,
					'component'         => isset( $option['component'] ) ? $option['component'] : null,
					'part'              => isset( $option['part'] ) ? $option['part'] : null,
					'property'          => isset( $option['property'] ) ? $option['property'] : null,
					'component_states'  => $component_states,
					'css_states'        => $css_states,
				];

				add_settings_field( "{$page_id}[{$name}]", $label, $callback, $page_id, $section_id, $args );

				// Register state. These fields should not render or belong to a registered section.
				// The callback of the main fields will be responsible for rendering the inputs.

				if ( ! empty( $css_states ) ) {
					foreach ( $css_states as $css_state_name => $css_state_config ) {
						$name = implode( '--', [ $name, $css_state_name ] );
						add_settings_field( "{$page_id}[{$name}]", $css_state_config['label'], '__return_null', $page_id, '__DTPC_HIDDEN__' );
					}
				}
			}
		}

		// Creates our settings in the options table.
		$this->register_settings();
	}

	/**
	 * Create settings for registered sections.
	 *
	 * @return void
	 */
	public function register_settings() {
		foreach ( $this->settings_sections as $id => $section ) {
			if ( ! isset( $this->settings_fields[ $id ] ) ) {
				continue;
			}

			$fields      = $this->settings_fields[ $id ];
			$prefixed_id = DTPODCASTS_SETTINGS_SECTION_PREFIX . $id;

			if ( isset( $section['parent'] ) ) {
				$prefixed_id = DTPODCASTS_SETTINGS_SECTION_PREFIX . $section['parent'];
			}

			$args = [
				'type'              => 'object',
				'sanitize_callback' => [ $this, 'sanitize_options' ],
			];

			if ( isset( $section['show_in_rest'] ) ) {
				$show_in_rest = [];
				$schema       = [
					'type'       => 'object',
					'properties' => [],
				];

				foreach ( $fields as $option ) {
					$name        = $option['name'];
					$schema_type = isset( $option['schema'] ) ? $option['schema'] : [ 'type' => 'string' ];

					$schema['properties'][ $name ] = $schema_type;
				}

				$show_in_rest['schema'] = $schema;

				$args['show_in_rest'] = $show_in_rest;
			}

			register_setting(
				$prefixed_id,
				$prefixed_id,
				$args
			);
		}
	}

	/**
	 * Sanitization callback for password fields.
	 *
	 * @param string $value Password field value.
	 * @return string
	 */
	public function sanitize_password_callback( $value ) {
		return Crypto::encrypt( $value, $this->key );
	}

	/**
	 * Get field name.
	 *
	 * Normalizes construction of field names for component property fields.
	 *
	 * @param array<string,string> $args Settings field args.
	 */
	public function get_field_name( array $args ): string {

		if ( isset( $args['component'] ) && ! empty( $args['component'] ) ) {
			$name_parts = [ $args['component'] ];

			if ( isset( $args['part'] ) && ! empty( $args['part'] ) ) {
				$name_parts[] = $args['part'];
			}

			if ( isset( $args['property'] ) && ! empty( $args['property'] ) ) {
				$name_parts[] = $args['property'];
			}

			return implode( '--', $name_parts );
		}

		return isset( $args['name'] ) ? $args['name'] : '';
	}

	/**
	 * Get field description for display.
	 *
	 * @param array<string,string> $args Settings field args.
	 */
	public function get_field_description( array $args ): string {
		if ( ! empty( $args['desc'] ) ) {
			$desc = sprintf( '<div class="description">%s</div>', $args['desc'] );
		} else {
			$desc = '';
		}

		return $desc;
	}

	/**
	 * Displays a text field for a settings field.
	 *
	 * @param array<string,mixed> $args Settings field args.
	 *
	 * @return void
	 */
	public function callback_text( array $args ) {
		$value       = isset( $args['value'] ) && ! empty( $args['value'] ) ? esc_attr( $args['value'] ) : esc_attr( $this->get_option( $args['id'], $args['section'], $args['std'] ) );
		$size        = isset( $args['size'] ) && ! is_null( $args['size'] ) ? $args['size'] : 'regular';
		$type        = isset( $args['type'] ) ? $args['type'] : 'text';
		$placeholder = empty( $args['placeholder'] ) ? '' : ' placeholder="' . $args['placeholder'] . '"';
		$disabled    = isset( $args['disabled'] ) && true === $args['disabled'] ? 'disabled' : null;
		$html        = sprintf( '<input type="%1$s" class="%2$s-text" id="%3$s[%4$s]" name="%3$s[%4$s]" value="%5$s"%6$s %7$s>', $type, $size, $args['section'], $args['id'], $value, $placeholder, $disabled );
		$html       .= $this->get_field_description( $args );

		echo wp_kses( $html, self::get_allowed_wp_kses_html() );
	}

	/**
	 * Displays a url field for a settings field.
	 *
	 * @param array<string,mixed> $args Settings field args.
	 *
	 * @return void
	 */
	public function callback_url( array $args ) {
		$this->callback_text( $args );
	}

	/**
	 * Displays a number field for a settings field.
	 *
	 * @param array<string,mixed> $args Settings field args.
	 *
	 * @return void
	 */
	public function callback_number( array $args ) {
		$value       = esc_attr( $this->get_option( $args['id'], $args['section'], $args['std'] ) );
		$size        = isset( $args['size'] ) && ! is_null( $args['size'] ) ? $args['size'] : 'regular';
		$type        = isset( $args['type'] ) ? $args['type'] : 'number';
		$placeholder = empty( $args['placeholder'] ) ? '' : ' placeholder="' . $args['placeholder'] . '"';
		$min         = ( '' === $args['min'] ) ? '' : ' min="' . $args['min'] . '"';
		$max         = ( '' === $args['max'] ) ? '' : ' max="' . $args['max'] . '"';
		$step        = ( '' === $args['step'] ) ? '' : ' step="' . $args['step'] . '"';

		$html  = sprintf( '<input type="%1$s" class="%2$s-number" id="%3$s[%4$s]" name="%3$s[%4$s]" value="%5$s"%6$s%7$s%8$s%9$s>', $type, $size, $args['section'], $args['id'], $value, $placeholder, $min, $max, $step );
		$html .= $this->get_field_description( $args );

		echo wp_kses( $html, self::get_allowed_wp_kses_html() );
	}

	/**
	 * Displays a checkbox for a settings field.
	 *
	 * @param array<string,mixed> $args Settings field args.
	 *
	 * @return void
	 */
	public function callback_checkbox( array $args ) {
		$value    = isset( $args['value'] ) && ! empty( $args['value'] ) ? esc_attr( $args['value'] ) : esc_attr( $this->get_option( $args['id'], $args['section'], $args['std'] ) );
		$disabled = isset( $args['disabled'] ) && true === $args['disabled'] ? 'disabled' : null;

		$html  = '<fieldset>';
		$html .= sprintf( '<label for="wpuf-%1$s[%2$s]">', $args['section'], $args['id'] );
		$html .= sprintf( '<input type="hidden" name="%1$s[%2$s]" value="off">', $args['section'], $args['id'] );
		$html .= sprintf( '<input type="checkbox" class="checkbox" id="wpuf-%1$s[%2$s]" name="%1$s[%2$s]" value="on" %3$s %4$s>', $args['section'], $args['id'], checked( $value, 'on', false ), $disabled );
		$html .= sprintf( '%1$s</label>', $args['desc'] );
		$html .= '</fieldset>';

		echo wp_kses( $html, self::get_allowed_wp_kses_html() );
	}

	/**
	 * Displays a multi-checkbox for a settings field.
	 *
	 * @param array<string,mixed> $args Settings field args.
	 *
	 * @return void
	 */
	public function callback_multicheck( array $args ) {
		$value = $this->get_option( $args['id'], $args['section'], $args['std'] );
		$html  = '<fieldset>';
		$html .= sprintf( '<input type="hidden" name="%1$s[%2$s]" value="">', $args['section'], $args['id'] );
		foreach ( $args['options'] as $key => $label ) {
			$checked = isset( $value[ $key ] ) ? $value[ $key ] : '0';
			$html   .= sprintf( '<label for="wpuf-%1$s[%2$s][%3$s]">', $args['section'], $args['id'], $key );
			$html   .= sprintf( '<input type="checkbox" class="checkbox" id="wpuf-%1$s[%2$s][%3$s]" name="%1$s[%2$s][%3$s]" value="%3$s" %4$s>', $args['section'], $args['id'], $key, checked( $checked, $key, false ) );
			$html   .= sprintf( '%1$s</label><br>', $label );
		}

		$html .= $this->get_field_description( $args );
		$html .= '</fieldset>';

		echo wp_kses( $html, self::get_allowed_wp_kses_html() );
	}

	/**
	 * Displays a radio button for a settings field.
	 *
	 * @param array<string,mixed> $args Settings field args.
	 *
	 * @return void
	 */
	public function callback_radio( array $args ) {
		$value = $this->get_option( $args['id'], $args['section'], $args['std'] );
		$html  = '<fieldset>';

		foreach ( $args['options'] as $key => $label ) {
			$html .= sprintf( '<label for="wpuf-%1$s[%2$s][%3$s]">', $args['section'], $args['id'], $key );
			$html .= sprintf( '<input type="radio" class="radio" id="wpuf-%1$s[%2$s][%3$s]" name="%1$s[%2$s]" value="%3$s" %4$s>', $args['section'], $args['id'], $key, checked( $value, $key, false ) );
			$html .= sprintf( '%1$s</label><br>', $label );
		}

		$html .= $this->get_field_description( $args );
		$html .= '</fieldset>';

		echo wp_kses( $html, self::get_allowed_wp_kses_html() );
	}

	/**
	 * Displays a select element for a settings field.
	 *
	 * @param array<string,mixed> $args Settings field args.
	 *
	 * @return void
	 */
	public function callback_select( array $args ) {
		$value = esc_attr( $this->get_option( $args['id'], $args['section'], $args['std'] ) );
		$size  = isset( $args['size'] ) && ! is_null( $args['size'] ) ? $args['size'] : 'regular';
		$html  = sprintf( '<select class="%1$s" name="%2$s[%3$s]" id="%2$s[%3$s]">', $size, $args['section'], $args['id'] );

		foreach ( $args['options'] as $key => $label ) {
			$html .= sprintf( '<option value="%s"%s>%s</option>', $key, selected( $value, $key, false ), $label );
		}

		$html .= sprintf( '</select>' );
		$html .= $this->get_field_description( $args );

		echo wp_kses( $html, self::get_allowed_wp_kses_html() );
	}

	/**
	 * Displays a textarea for a settings field.
	 *
	 * @param array<string,mixed> $args Settings field args.
	 *
	 * @return void
	 */
	public function callback_textarea( array $args ) {
		$value       = esc_textarea( $this->get_option( $args['id'], $args['section'], $args['std'] ) );
		$size        = isset( $args['size'] ) && ! is_null( $args['size'] ) ? $args['size'] : 'regular';
		$placeholder = empty( $args['placeholder'] ) ? '' : ' placeholder="' . $args['placeholder'] . '"';

		$html  = sprintf( '<textarea rows="5" cols="55" class="%1$s-text" id="%2$s[%3$s]" name="%2$s[%3$s]"%4$s>%5$s</textarea>', $size, $args['section'], $args['id'], $placeholder, $value );
		$html .= $this->get_field_description( $args );

		echo wp_kses( $html, self::get_allowed_wp_kses_html() );
	}

	/**
	 * Displays the html for a settings field.
	 *
	 * @param array<string,mixed> $args Settings field args.
	 *
	 * @return void
	 */
	public function callback_html( array $args ) {
		echo wp_kses( $this->get_field_description( $args ), self::get_allowed_wp_kses_html() );
	}

	/**
	 * Displays a rich text textarea for a settings field.
	 *
	 * @param array<string,mixed> $args Settings field args.
	 *
	 * @return void
	 */
	public function callback_wysiwyg( array $args ) {
		$value = $this->get_option( $args['id'], $args['section'], $args['std'] );
		$size  = isset( $args['size'] ) && ! is_null( $args['size'] ) ? $args['size'] : '500px';

		echo '<div style="max-width: ' . esc_attr( $size ) . ';">';

		$editor_settings = [
			'teeny'         => true,
			'textarea_name' => $args['section'] . '[' . $args['id'] . ']',
			'textarea_rows' => 10,
		];

		if ( isset( $args['options'] ) && is_array( $args['options'] ) ) {
			$editor_settings = array_merge( $editor_settings, $args['options'] );
		}

		wp_editor( $value, $args['section'] . '-' . $args['id'], $editor_settings );

		echo '</div>';

		echo wp_kses( $this->get_field_description( $args ), self::get_allowed_wp_kses_html() );
	}

	/**
	 * Displays a file upload field for a settings field.
	 *
	 * @param array<string,mixed> $args Settings field args.
	 *
	 * @return void
	 */
	public function callback_file( array $args ) {
		$value = esc_attr( $this->get_option( $args['id'], $args['section'], $args['std'] ) );
		$size  = isset( $args['size'] ) && ! is_null( $args['size'] ) ? $args['size'] : 'regular';
		$label = isset( $args['options']['button_label'] ) ? $args['options']['button_label'] : __( 'Choose File', 'dovetail-podcasts' );

		$html  = sprintf( '<input type="text" class="%1$s-text wpsa-url" id="%2$s[%3$s]" name="%2$s[%3$s]" value="%4$s">', $size, $args['section'], $args['id'], $value );
		$html .= '<input type="button" class="button wpsa-browse" value="' . $label . '">';
		$html .= $this->get_field_description( $args );

		echo wp_kses( $html, self::get_allowed_wp_kses_html() );
	}

	/**
	 * Displays a password field for a settings field.
	 *
	 * @param array<string,mixed> $args Settings field args.
	 *
	 * @return void
	 */
	public function callback_password( array $args ) {
		$value_encrypted = $this->get_option( $args['id'], $args['section'], $args['std'] );
		$value           = esc_attr( \Defuse\Crypto\Core::MINIMUM_CIPHERTEXT_SIZE <= strlen( $value_encrypted ) ? Crypto::decrypt( $value_encrypted, $this->key ) : $value_encrypted );
		$size            = isset( $args['size'] ) && ! is_null( $args['size'] ) ? $args['size'] : 'regular';

		$html  = '<span class="password-wrapper">';
		$html .= sprintf( '<input type="password" class="%1$s-text" id="%2$s[%3$s]" name="%2$s[%3$s]" value="%4$s">', $size, $args['section'], $args['id'], $value );
		$html .= sprintf( '<button type="button" class="icon-button dashicons-before dashicons-visibility" title="Show"></button>', $args['section'], $args['id'] );
		$html .= '</span>';
		$html .= $this->get_field_description( $args );

		echo wp_kses( $html, self::get_allowed_wp_kses_html() );
	}

	/**
	 * Displays a color picker field for a settings field.
	 *
	 * @param array<string,mixed> $args Settings field args.
	 *
	 * @return void
	 */
	public function callback_color( $args ) {
		$id    = $this->get_field_name( $args );
		$value = esc_attr( $this->get_option( $id, $args['section'], $args['std'] ) );
		$size  = isset( $args['size'] ) && ! is_null( $args['size'] ) ? $args['size'] : 'regular';
		$class = isset( $args['class'] ) && ! is_null( $args['class'] ) ? ' ' . $args['class'] : '';

		$fieldset_template    = '<fieldset class="dtpc-color-set">%1$s</fieldset>';
		$state_field_template = '<div class="dtpc-color-state"><label for="%1$s[%2$s]" title="%4$s">%3$s</label>%5$s</div>';
		$input_template       = '<input type="text" class="%1$s-text wp-color-picker-field%6$s" id="%2$s[%3$s]" name="%2$s[%3$s]" value="%4$s" data-default-color="%5$s">';
		$normal_state_label   = __( 'Normal', 'dovetail-podcasts' );
		$normal_state_desc    = __( 'Normal color.', 'dovetail-podcasts' );

		$html = sprintf( $input_template, $size, $args['section'], $id, $value, $args['std'], $class );

		if ( is_array( $args['css_states'] ) ) {
			$fieldset_html = sprintf( $state_field_template, $args['section'], $id, esc_attr( $normal_state_label ), esc_attr( $normal_state_desc ), $html );

			foreach ( $args['css_states'] as $css_state_name => $css_state_config ) {
				$css_state_id   = implode( '--', [ $id, $css_state_name ] );
				$value          = esc_attr( $this->get_option( $css_state_id, $args['section'], $args['std'] ) );
				$input_html     = sprintf( $input_template, $size, $args['section'], $css_state_id, $value, $args['std'], $class );
				$fieldset_html .= sprintf( $state_field_template, $args['section'], $css_state_id, esc_attr( $css_state_config['label'] ), esc_attr( $css_state_config['desc'] ), $input_html );
			}

			$html = sprintf( $fieldset_template, $fieldset_html );
		}

		if ( is_array( $args['component_states'] ) ) {
			foreach ( $args['component_states'] as $component_state_name => $component_state_config ) {
				$fieldset_html      = sprintf( '<legend title="%2$s">%1$s</legend>', esc_attr( $component_state_config['label'] ), esc_attr( $component_state_config['desc'] ) );
				$component_state_id = implode( '--', [ $id, $component_state_name ] );
				$value              = esc_attr( $this->get_option( $component_state_id, $args['section'], $args['std'] ) );
				$input_html         = sprintf( $input_template, $size, $args['section'], $component_state_id, $value, $args['std'], $class );
				$fieldset_html     .= sprintf( $state_field_template, $args['section'], $component_state_id, esc_attr( $normal_state_label ), esc_attr( $normal_state_desc ), $input_html );

				foreach ( $args['css_states'] as $css_state_name => $css_state_config ) {
					$css_state_id   = implode( '--', [ $component_state_id, $css_state_name ] );
					$value          = esc_attr( $this->get_option( $css_state_id, $args['section'], $args['std'] ) );
					$input_html     = sprintf( $input_template, $size, $args['section'], $css_state_id, $value, $args['std'], $class );
					$fieldset_html .= sprintf( $state_field_template, $args['section'], $css_state_id, esc_attr( $css_state_config['label'] ), esc_attr( $css_state_config['desc'] ), $input_html );
				}

				$html .= sprintf( $fieldset_template, $fieldset_html );
			}
		}

		$html .= $this->get_field_description( $args );

		echo wp_kses( $html, self::get_allowed_wp_kses_html() );
	}

	/**
	 * Displays a select box for creating the pages select box.
	 *
	 * @param array<string,mixed> $args Settings field args.
	 *
	 * @return void
	 */
	public function callback_pages( array $args ) {
		$dropdown_args = array_merge(
			[
				'selected' => esc_attr( $this->get_option( $args['id'], $args['section'], $args['std'] ) ),
				'name'     => $args['section'] . '[' . $args['id'] . ']',
				'id'       => $args['section'] . '[' . $args['id'] . ']',
				'echo'     => 0,
			],
			$args
		);

		$clean_args = [];
		foreach ( $dropdown_args as $key => $arg ) {
			$clean_args[ $key ] = wp_kses( $arg, self::get_allowed_wp_kses_html() );
		}

		// Ignored as this is providing an array as expected.
		echo wp_dropdown_pages( $clean_args ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}

	/**
	 * Displays a select box for user roles.
	 *
	 * @param array<string,mixed> $args settings field args.
	 *
	 * @return void
	 */
	public function callback_user_role_select( array $args ) {
		$selected = esc_attr( $this->get_option( $args['id'], $args['section'], $args['std'] ) );

		if ( empty( $selected ) ) {
			$selected = isset( $args['default'] ) ? $args['default'] : null;
		}

		$name = $args['section'] . '[' . $args['id'] . ']';
		$id   = $args['section'] . '[' . $args['id'] . ']';

		echo '<select id="' . esc_attr( $id ) . '" name="' . esc_attr( $name ) . '">';
		echo '<option value="any">Any</option>';
		wp_dropdown_roles( $selected );
		echo '</select>';
		echo wp_kses( $this->get_field_description( $args ), self::get_allowed_wp_kses_html() );
	}

	/**
	 * Sanitize callback for Settings API.
	 *
	 * @param array<string,mixed> $options Settings field args.
	 *
	 * @return array<string,mixed>
	 */
	public function sanitize_options( array $options ) {
		if ( ! $options ) {
			return $options;
		}

		foreach ( $options as $option_slug => $option_value ) {
			$sanitize_callback = $this->get_sanitize_callback( $option_slug );

			// If callback is set, call it.
			if ( $sanitize_callback ) {
				$options[ $option_slug ] = call_user_func( $sanitize_callback, $option_value );
				continue;
			}
		}

		return $options;
	}

	/**
	 * Get sanitization callback for given option name.
	 *
	 * @param string $slug option Option name.
	 *
	 * @return callable|false
	 */
	public function get_sanitize_callback( $slug = '' ) {
		if ( empty( $slug ) ) {
			return false;
		}

		// Iterate over registered fields and see if we can find proper callback.
		foreach ( $this->settings_fields as $options ) {
			foreach ( $options as $option ) {
				if ( $slug !== $option['name'] ) {
					continue;
				}

				$callback = isset( $option['sanitize_callback'] ) && is_callable( $option['sanitize_callback'] ) ? $option['sanitize_callback'] : false;

				if ( 'password' === $option['type'] ) {
					if ( ! $callback ) {
						$callback = [ $this, 'sanitize_password_callback' ];
					} elseif ( $callback ) {
						$options_callback           = $callback;
						$sanitize_password_callback = [ $this, 'sanitize_password_callback' ];
						$callback                   = static function ( string $value ) use ( $sanitize_password_callback, $options_callback ) {
							$value = call_user_func( $options_callback, $value );
							return call_user_func( $sanitize_password_callback, $value );
						};
					}
				}

				// Return the callback name.
				return $callback;
			}
		}

		return false;
	}

	/**
	 * Get the value of a settings field.
	 *
	 * @param string $option  Settings field name.
	 * @param string $section The section name this field belongs to.
	 * @param mixed  $default_value Default text if it's not found.
	 *
	 * @return mixed
	 */
	public static function get_option( $option, $section, $default_value = null ) {
		$is_prefixed = strpos( $section, DTPODCASTS_SETTINGS_SECTION_PREFIX ) === 0;
		$section     = $is_prefixed ? $section : DTPODCASTS_SETTINGS_SECTION_PREFIX . $section;
		$options     = get_option( $section );

		if ( isset( $options[ $option ] ) ) {
			return $options[ $option ];
		}

		return $default_value;
	}

	/**
	 * Get section configs for top navigation tabs.
	 *
	 * @return array<string,array<string,mixed>>
	 */
	public function get_navigation_sections() {
		$nav_sections = [];

		foreach ( $this->page_slugs as $page_id ) {
			if ( isset( $this->settings_sections[ $page_id ] ) ) {
				$nav_sections[ $page_id ] = $this->settings_sections[ $page_id ];
			}
		}

		return $nav_sections;
	}

	/**
	 * Shows all the settings section labels as tabs.
	 *
	 * @return void
	 */
	public function show_navigation() {
		$html = '<nav class="nav-tab-wrapper">';

		$nav_sections = $this->get_navigation_sections();

		$count = count( $nav_sections );

		// Don't show the navigation if only one section exists.
		if ( 1 === $count ) {
			return;
		}

		foreach ( $nav_sections as $tab ) {
			$html .= sprintf( '<a href="#%1$s" class="nav-tab" id="%1$s-tab">%2$s</a>', DTPODCASTS_SETTINGS_SECTION_PREFIX . $tab['id'], $tab['title'] );
		}

		$html .= '</nav>';

		echo wp_kses( $html, self::get_allowed_wp_kses_html() );
	}

	/**
	 * Show the section settings forms
	 *
	 * This function displays every sections in a different form.
	 *
	 * @return void
	 */
	public function show_forms() {
		global $wp_settings_fields;

		$nav_sections = $this->get_navigation_sections();
		?>
		<div class="metabox-holder">
			<?php
			foreach ( $nav_sections as $id => $form ) {
				?>
				<div id="<?php echo esc_attr( DTPODCASTS_SETTINGS_SECTION_PREFIX . $id ); ?>" class="group" style="display: none;">
					<form method="post" action="options.php">
						<?php
						do_action( 'dovetail_podcasts_settings_form_top', $form );
						settings_fields( DTPODCASTS_SETTINGS_SECTION_PREFIX . $id );
						do_settings_sections( DTPODCASTS_SETTINGS_SECTION_PREFIX . $id );
						do_action( 'dovetail_podcasts_settings_form_bottom', $form );
						if ( isset( $this->settings_fields[ $id ] ) ) :
							?>
							<div>
								<?php submit_button(); ?>
							</div>
						<?php endif; ?>
					</form>
				</div>
			<?php } ?>
		</div>
		<?php
		$this->script();
	}

	/**
	 * Tabbable JavaScript codes & Initiate Color Picker
	 *
	 * This code uses URL hash fragments and localStorage for displaying active tabs.
	 *
	 * @return void
	 */
	public function script() {
		?>
		<script>
			jQuery(document).ready(function ($) {
				// Initiate Color Picker.
				$('.wp-color-picker-field:not(.dtpc-player-style)').wpColorPicker({
					palettes: false
				});

				// Switches option sections.
				const $groups = $('.group');
				const urlHash = window.location.hash;
				const localStorageTab = localStorage?.getItem('activeTab');
				const activeTab = urlHash || ($groups.length > 1 && localStorageTab) || '';

				localStorage?.setItem("activeTab", activeTab);

				$groups.hide();

				if (activeTab && $(activeTab).length) {
					$(activeTab).fadeIn();
				} else {
					$('.group:first').fadeIn();
				}

				$('.group .collapsed').each(function () {
					$(this).find('input:checked').parent().parent().parent().nextAll().each(
						function () {
							if ($(this).hasClass('last')) {
								$(this).removeClass('hidden');
								return false;
							}
							$(this).filter('.hidden').removeClass('hidden');
						});
				});

				if (activeTab != '' && $(activeTab + '-tab').length) {
					$(activeTab + '-tab').addClass('nav-tab-active');
				} else {
					$('.nav-tab-wrapper a:first').addClass('nav-tab-active');
				}

				$('.nav-tab-wrapper a').click(function (evt) {
					$('.nav-tab-wrapper a').removeClass('nav-tab-active');
					$(this).addClass('nav-tab-active').blur();
					var clicked_group = $(this).attr('href');
					if (typeof (localStorage) != 'undefined') {
						localStorage.setItem("activeTab", clicked_group);
					}
					history.replaceState(null, '', clicked_group);
					$('.group').hide();
					$(clicked_group).fadeIn();
					evt.preventDefault();
				});

				$('.wpsa-browse').on('click', function (event) {
					event.preventDefault();

					var self = $(this);

					// Create the media frame.
					var file_frame = wp.media.frames.file_frame = wp.media({
						title: self.data('uploader_title'),
						button: {
							text: self.data('uploader_button_text'),
						},
						multiple: false
					});

					file_frame.on('select', function () {
						attachment = file_frame.state().get('selection').first().toJSON();
						self.prev('.wpsa-url').val(attachment.url).change();
					});

					// Finally, open the modal.
					file_frame.open();
				});
			});
		</script>
		<?php
		$this->_style_fix();
	}

	/**
	 * Add styles to adjust some settings.
	 *
	 * @return void
	 */
	public function _style_fix() { // phpcs:ignore PSR2.Methods.MethodDeclaration.Underscore
		global $wp_version;

		if ( version_compare( $wp_version, '3.8', '<=' ) ) :
			?>
			<style type="text/css">
				/** WordPress 3.8 Fix **/
				.form-table th {
					padding: 20px 10px;
				}

				#wpbody-content .metabox-holder {
					padding-top: 5px;
				}
			</style>
			<?php
		endif;
	}

	/**
	 * Helper function that defines the allowed HTML to use on the Settings pages
	 *
	 * @return array<string,array<string,mixed>>
	 */
	public static function get_allowed_wp_kses_html() {
		$allowed_atts = [
			'align'                => [],
			'class'                => [],
			'type'                 => [],
			'id'                   => [],
			'dir'                  => [],
			'lang'                 => [],
			'style'                => [],
			'xml:lang'             => [],
			'src'                  => [],
			'alt'                  => [],
			'href'                 => [],
			'rel'                  => [],
			'rev'                  => [],
			'target'               => [],
			'novalidate'           => [],
			'value'                => [],
			'name'                 => [],
			'tabindex'             => [],
			'action'               => [],
			'method'               => [],
			'for'                  => [],
			'width'                => [],
			'height'               => [],
			'data'                 => [],
			'title'                => [],
			'checked'              => [],
			'disabled'             => [],
			'selected'             => [],
			'open'                 => [],
			'data-component'       => [],
			'data-part'            => [],
			'data-property'        => [],
			'data-component-state' => [],
			'data-css-state'       => [],
		];

		return [
			'form'     => $allowed_atts,
			'fieldset' => $allowed_atts,
			'legend'   => $allowed_atts,
			'label'    => $allowed_atts,
			'button'   => $allowed_atts,
			'input'    => $allowed_atts,
			'textarea' => $allowed_atts,
			'iframe'   => $allowed_atts,
			'script'   => $allowed_atts,
			'select'   => $allowed_atts,
			'option'   => $allowed_atts,
			'style'    => $allowed_atts,
			'strong'   => $allowed_atts,
			'small'    => $allowed_atts,
			'kbd'      => $allowed_atts,
			'table'    => $allowed_atts,
			'span'     => $allowed_atts,
			'abbr'     => $allowed_atts,
			'code'     => $allowed_atts,
			'pre'      => $allowed_atts,
			'div'      => $allowed_atts,
			'nav'      => $allowed_atts,
			'img'      => $allowed_atts,
			'h1'       => $allowed_atts,
			'h2'       => $allowed_atts,
			'h3'       => $allowed_atts,
			'h4'       => $allowed_atts,
			'h5'       => $allowed_atts,
			'h6'       => $allowed_atts,
			'ol'       => $allowed_atts,
			'ul'       => $allowed_atts,
			'li'       => $allowed_atts,
			'em'       => $allowed_atts,
			'hr'       => $allowed_atts,
			'br'       => $allowed_atts,
			'tr'       => $allowed_atts,
			'td'       => $allowed_atts,
			'p'        => $allowed_atts,
			'a'        => $allowed_atts,
			'b'        => $allowed_atts,
			'i'        => $allowed_atts,
			'dl'       => $allowed_atts,
			'dt'       => $allowed_atts,
			'dd'       => $allowed_atts,
			'details'  => $allowed_atts,
			'summary'  => $allowed_atts,
		];
	}
}
