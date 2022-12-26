import { Card, Col, Row, Table } from 'antd'
import React, { useState } from 'react'

export default function AddCustomeSellReport() {
    const [products, setProducts] = useState();

    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'p_name',
            key: 'p_name',
        },
        {
            title: 'Sold Rate',
            dataIndex: 'p_code',
            key: 'p_code',
        },
        {
            title: 'ACTION',
            key: 'address',
            render: (item, row, index) => (
                <>
                    <div className="dropdown">
                        <button className="btn p-0" type="button" id="dropdownMenuButton3" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-horizontal icon-lg text-muted pb-3px"><circle cx={12} cy={12} r={1} /><circle cx={19} cy={12} r={1} /><circle cx={5} cy={12} r={1} /></svg>
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton3">
                            <a className="dropdown-item d-flex align-items-center" href="javascript:;"
                                onClick={() => { updateExpenses(item) }}>
                                <span className="ml-2">Edit</span>
                            </a>
                        </div>
                    </div>
                </>
            )
        },
    ];
  return (
    <div className='page-content'>
        <Card>
            <Row gutter={16}>
                <Col className="gutter-row" span={8}>
                <Table columns={columns} dataSource={products} />
                </Col>
                <Col className="gutter-row" span={16}>

                </Col>
            </Row>
        </Card>
    </div>
  )
}
