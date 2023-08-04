import Feed from '../../components/Feed.jsx';
import {FloatButton, Modal} from "antd";
import {PlusOutlined} from '@ant-design/icons';
import {useState} from 'react';
import NewPostModal from '../../components/NewPostModal.jsx';

import axios from 'axios';

export default function Home() {
  const [open, setOpen] = useState(false)

  function handleOpen() {
    setOpen(true);
  }

  function handleOk(values) {
    console.log('passed values: ', values)
    //@todo - move this one day
    axios.post('http://localhost:3000/sns/posts', values, {withCredentials: true} )

    setOpen(false);
  }
  function handleCancel() {
    setOpen(false);
  }

  // console.log('set form data: ', formData);
  return (
    <div style={{position: 'relative', left: '40%' }}>
      <Feed />
      <FloatButton icon={<PlusOutlined />}onClick={handleOpen}/>
      <Modal titel='New Post Form' open={open} footer={null} onCancel={handleCancel}>
        <NewPostModal onOk={handleOk} />
      </Modal>
    </div>
  );
}
