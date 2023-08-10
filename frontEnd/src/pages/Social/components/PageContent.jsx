import Feed from './Feed.jsx';
import {FloatButton, Modal} from "antd";
import {PlusOutlined} from '@ant-design/icons';
import {useState} from 'react';
import NewPostModal from './NewPostModal.jsx';
import API from '../../../Helper/API.js';

export default function PageContent({saved, setSaved, meals}) {
  const [open, setOpen] = useState(false)

  function handleOpen() {
    setOpen(true);
  }

  function handleOk(values) {
    //@todo - move this one day
    API.POST_SNS(values).then((response) => {
      console.log('post added');
    }).catch((error) => {
      console.log(error)
    });
    //axios.post('http://localhost:3000/sns/posts', values, {withCredentials: true} )

    setOpen(false);
  }
  function handleCancel() {
    setOpen(false);
  }

  return (
    <div>
      <Feed saved={saved} setSaved={setSaved}/>
      <FloatButton icon={<PlusOutlined />}onClick={handleOpen}/>
      <Modal title='New Post Form' open={open} footer={null} onCancel={handleCancel}>
        <NewPostModal meals={meals} onOk={handleOk} />
      </Modal>
    </div>
  );
}