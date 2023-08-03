import {useState} from 'react';
import {Form, Input, Button, Upload, Select} from 'antd';
import {PlusOutlined} from "@ant-design/icons";

const {TextArea} = Input;

export default function NewPostModal({ onOk }) {
  const [fileList, setFileList] = useState([]);
  const fakeMeals =
  [
    {
      value: 'Cheesieburger',
      label: 'CheesieBurger'
    },
    {
      value: 'Noods',
      label: 'Noods'
    },
    {
      value: 'Burite',
      label: 'Burite'
    },
  ];
  const uploadButton = (
    <div>
      <PlusOutlined />
    </div>
  )

  function handleChange({fileList: newFileList}) {
    setFileList(newFileList)
  }

  function handleSelect(value) {
    console.log(`selected ${value}`);
  }
  function onFinish(values) {
    onOk(values);
  }

  return (
    <Form
      name='new post form'
      onFinish={onFinish}
      initialValues={{
        mealSelect: fakeMeals[0].value
      }}
      style={{position: 'relative', top: '25px', width: '90%'}}
      labelWrap
      labelAlign='right'
      labelCol={{flex: '25%'}}
      colon={false}
    >
      <Form.Item
        label='Title'
        name='title'
        rules={[
          {
            required: true,
            message: '${label} required'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='mealSelect'
        label='Meal/Plan'
      >
        <Select
          onChange={handleSelect}
          options={fakeMeals}
        >
        </Select>
      </Form.Item>
      <Form.Item
        label='Description'
        name='description'
        rules={[
          {
            required: true,
            message: '${label} required'
          }
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item
        name='photos'
        label='Photos'
      >
        <Upload
          listType='picture-card'
          fileList={fileList}
          onChange={handleChange}
          beforeUpload={() => false}
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' style={{position: 'relative', left: '95%', backgroundColor: '#1677ff'}}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}