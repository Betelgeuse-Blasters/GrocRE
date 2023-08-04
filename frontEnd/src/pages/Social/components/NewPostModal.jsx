import {useState, useEffect} from 'react';
import {Form, Input, Button, Upload, Select} from 'antd';
import {PlusOutlined} from "@ant-design/icons";

const {TextArea} = Input;

export default function NewPostModal({ meals, onOk }) {
  const [fileList, setFileList] = useState([]);
  const [mealNames, setMealNames] = useState([])
  useEffect(() => {
    meals.map((meal, j) => {
      setMealNames((mealNames) => [...mealNames, {label: meal.recipeName, value: meal.id}])
    })
  },[])
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

    console.log('VALUE', values)
    if(values.photos.length>0){
      let{title,description, mealSelect, photos:{fileList}}=values;
      const photosArr =[]
      fileList.map(()=> {photosArr.push(URL.createObjectURL(new Blob(fileList)).replace("blob:",""))})
      fileList = photosArr
      const final = {title,description,mealSelect,fileList};
      onOk(final);
    } else {
      onOk(values)
    }

  }
  console.log(mealNames)
  return (
    <Form
      name='new post form'
      onFinish={onFinish}
      initialValues={{
        mealSelect: meals[0].id,
        photos: []
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
          options={mealNames}
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
        <Button
        type='primary'
        htmlType='submit'
        style={
          {
            position: 'relative',
            left: '95%',
            backgroundColor: '#1677ff'
          }
        }>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}