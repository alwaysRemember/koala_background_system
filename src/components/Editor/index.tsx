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
import {
  IEditor,
  IUploadItem,
  IMediaLibraryItem,
  IMediaLibraryResponseItem,
} from './interface';
import { uploadMediaLibrary, getMediaLibraryList } from '@/api';

const Editor = ({
  content,
  cref,
}: {
  content: string;
  cref: MutableRefObject<IEditor | undefined>;
}) => {
  const [value, setValue] = useState<EditorState>();
  const editorRef = useRef<any>();
  const [mediaList, setMediaList] = useState<Array<IMediaLibraryItem>>([]);

  useImperativeHandle(cref, () => ({
    // 获取编辑器内容
    getValue(): string {
      return value.toHTML();
    },
    // 获取编辑器的媒体文件id
    getMediaList(): Array<string> {
      return Object.values(JSON.parse(value.toRAW()).entityMap).map(
        item =>
          (item as { data: IMediaLibraryResponseItem }).data.meta?.id as string,
      );
    },
  }));

  const uploadFn = async ({ success, error, file }: IUploadItem) => {
    const formData = new FormData();
    formData.set('file', file);

    try {
      const { filePath, id } = await uploadMediaLibrary(formData);
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

  const getMediaData = async () => {
    try {
      const data = await getMediaLibraryList();
      setMediaList(data);
    } catch (e) {}
  };

  useEffect(() => {
    // 初始化文本内容
    setValue(BraftEditor.createEditorState(content ? content : null));
  }, [content]);

  useEffect(() => {
    getMediaData();
  }, []);

  useEffect(() => {
    editorRef.current?.getFinderInstance()?.addItems(
      mediaList.map((item: IMediaLibraryItem) =>
        Object.assign({}, item, {
          url: item.path,
          meta: {
            id: item.id,
          },
        }),
      ),
    );
  }, [mediaList]);

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
