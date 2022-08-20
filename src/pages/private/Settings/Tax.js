import React from 'react'
import { Button, Input } from 'antd';

export default function Tax() {
  return (
    <div>
      <Input addonBefore="Tax:" addonAfter="%" style={{width: '250px'}} defaultValue="5" />
      <Button ype="primary">Save</Button>
    </div>
  )
}
