
import { EpisodeData } from '@/types/state/episode';
import { useRef, useState, useEffect } from 'react';
// import { useSelect } from '@wordpress/data';

/**
 * Returns saving status, saved status, and current editor meta data.
 */
export function useEditorSaving(): [boolean,boolean] {
    const [ isPostSaved, setIsPostSaved ] = useState( false );
    const [ isSavingPost, setIsSavingPost ] = useState( false );
    const [ isAutosavingPost, setIsAutosavingPost ] = useState( false );
    const isSaving = isSavingPost && !isAutosavingPost;
    const isPostSavingInProgress = useRef( false );

    useEffect(() => {
      if (!wp.data) return;

      const unsubscribe = wp.data.subscribe(() => {
        const select = wp.data.select('core/editor');

        // console.log('wp.data.subscribe', select.getEditedPostAttribute('meta')?.['_dovetail_podcasts_episode'] );

        setIsSavingPost( select.isSavingPost() );
        setIsAutosavingPost( select.isAutosavingPost() );
      });

      return () => {
        unsubscribe();
      }
    },[]);

    useEffect( () => {
      if ( ( isSaving ) && ! isPostSavingInProgress.current ) {
        setIsPostSaved( false );
        isPostSavingInProgress.current = true;
      }
      if ( ! ( isSaving ) && isPostSavingInProgress.current ) {
        // Code to run after post is done saving.
        setIsPostSaved( true );
        isPostSavingInProgress.current = false;
      }
    }, [ isSaving ] );

    return [isSaving, isPostSaved];
};
