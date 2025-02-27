
import { useRef, useState, useEffect } from 'react';
// import { useSelect } from '@wordpress/data';

/**
 * Returns `true` if the post is done saving, `false` otherwise.
 */
export function useAfterSave() {
    const [ isPostSaved, setIsPostSaved ] = useState( false );
    const [ isSavingPost, setIsSavingPost ] = useState( false );
    const [ isAutosavingPost, setIsAutosavingPost ] = useState( false );
    const isPostSavingInProgress = useRef( false );

    useEffect(() => {
      if (!wp.data?.subscribe) return;

      const unsubscribe = wp.data.subscribe(() => {
        const select = wp.data.select('core/editor');
        setIsSavingPost( select.isSavingPost() );
        setIsAutosavingPost( select.isAutosavingPost() );
      });

      return () => {
        unsubscribe();
      }
    },[]);

    useEffect( () => {
      if ( ( isSavingPost || isAutosavingPost ) && ! isPostSavingInProgress.current ) {
        setIsPostSaved( false );
        isPostSavingInProgress.current = true;
      }
      if ( ! ( isSavingPost || isAutosavingPost ) && isPostSavingInProgress.current ) {
        // Code to run after post is done saving.
        setIsPostSaved( true );
        isPostSavingInProgress.current = false;
      }
    }, [ isSavingPost, isAutosavingPost ] );

    return isPostSaved;
};
