import React, {
  useState,
  useEffect,
  useImperativeHandle,
  MutableRefObject,
  useRef,
} from 'react';
import BraftEditor, { EditorState } from 'braft-editor';
import 'braft-editor/dist/index.css';
import styles from './index.less';
import { IEditor, IUploadItem } from './interface';
import { uploadMediaOnLibrary } from '@/api';

const Editor = ({
  content,
  cref,
}: {
  content: string;
  cref: MutableRefObject<IEditor | undefined>;
}) => {
  const [value, setValue] = useState<EditorState>();
  const editorRef = useRef<any>();

  useImperativeHandle(cref, () => ({
    getValue() {
      return value.toHTML();
    },
  }));

  const uploadFn = async ({ success, error, file }: IUploadItem) => {
    const formData = new FormData();
    formData.set('file', file);

    try {
      const { filePath, id } = await uploadMediaOnLibrary(formData);
      success({
        url: filePath,
        meta: {
          id: String(id) as string,
          title: file.name,
          alt: file.name,
          loop: true,
          autoPlay: false,
          controls: true,
          poster: '',
        },
      });
    } catch (e) {}
  };

  useEffect(() => {
    // 初始化文本内容
    setValue(BraftEditor.createEditorState(content ? content : null));
  }, [content]);

  useEffect(() => {
    console.log(value && JSON.parse(value.toRAW()));
  }, [value]);

  return (
    <div className={styles['editor-wrapper']}>
      <BraftEditor
        media={{
          uploadFn,
          accepts: {
            video: false,
            audio: false,
          },
          externals: {
            video: false,
            audio: false,
            embed: false,
          },
        }}
        ref={editorRef}
        value={value}
        onChange={editorState => setValue(editorState)}
      />
    </div>
  );
};

export default Editor;
