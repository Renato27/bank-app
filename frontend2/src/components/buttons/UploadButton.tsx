import { GetProp, Upload, UploadProps, message } from "antd";
import {
    LoadingOutlined,
    CloudUploadOutlined
} from '@ant-design/icons';
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import './css/UploadButton.css';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };
  
  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  interface UploadButtonProps {
    setImage: Dispatch<SetStateAction<string>>;
    image?: string;
  }

const UploadButton: React.FC<UploadButtonProps> = ({setImage, image}) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | undefined>("");
    const handleChange: UploadProps['onChange'] = (info) => {
      if (info.file.status === 'uploading') {
        setLoading(true);
        return;
      }
      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj as FileType, (url) => {
          setLoading(false);
          setImageUrl(image ?? url);
          setImage(url)
        });
      }
    };

    useEffect(() => {
      if (image) {
        setImageUrl(image);
      }
    }, [image]);
  
    const uploadButton = (
      <button style={{ border: 0, background: 'none', width: '100%' }} type="button">
        {loading ? <LoadingOutlined /> : <CloudUploadOutlined />}
        <div style={{ marginTop: 8 }}>Upload Check Picture</div>
      </button>
    );
    return (
        <Upload
        listType="picture-card"
        showUploadList={false}
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        className="upload-button"
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
};

export default UploadButton;