import Feed from '../../components/Feed.jsx';
import {FloatButton, Modal} from "antd";
import {PlusOutlined} from '@ant-design/icons';
import {useState} from 'react';
import NewPostModal from '../../components/NewPostModal.jsx';

import axios from 'axios';

export default function Home() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({});

  function handleOpen() {
    setOpen(true);
  }

  function handleOk(values) {
    console.log('passed values: ', values)
    setFormData(values);

    //@todo - move this one day
    axios.post('http://localhost:3000/upload', values.photos.fileList, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    setOpen(false);
  }
  function handleCancel() {
    setOpen(false);
  }

  console.log('set form data: ', formData);
  return (
    <div>
      <Feed />
      <FloatButton icon={<PlusOutlined />}style={{position: 'relative', left: '110%'}} onClick={handleOpen}/>
      <Modal titel='New Post Form' open={open} footer={null} onCancel={handleCancel}>
        <NewPostModal setFormData={setFormData} onOk={handleOk} />
      </Modal>
    </div>
  );
}
