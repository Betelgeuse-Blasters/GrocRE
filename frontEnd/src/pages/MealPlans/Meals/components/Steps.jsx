/* eslint-disable */
import { RollbackOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Collapse, Input, Button } from 'antd';

const Steps = ({steps, setSteps}) => {
  const [editing, setEditing] = useState(false);
  const [changes, setChanges] = useState(recipes);

  const editActions = () => {
    return (
      <>
        {
          editing ?
          <>
            <RollbackOutlined onClick={(e) => { e.stopPropagation(); }} style={{'marginRight': '1rem'}} />
            <CheckOutlined onClick={(e) => { e.stopPropagation(); setEditing(false); }} />
          </>
          : <EditOutlined onClick={(e) => {e.stopPropagation(); setEditing(true)}}/>
        }
      </>
    )
  }

  const items = {
    key: 'steps',
    label: 'Steps',
    children: steps.map(step => <Input defaultValue={step}/>),
    extra: editActions()
  };

  const recordActions = () => {
    return (
      <div className='flex justify-between my-[1rem]'>
        <Button>Delete</Button>
        <Button style={{color: 'white', backgroundColor: '#1677ff'}}>Add New</Button>
      </div>
    );
  }
  items.children.push(recordActions());

  return (
    <>
      <Collapse
        defaultActiveKey={['1']}
        items={[items]}
      />
    </>
  );

}

export default Steps;