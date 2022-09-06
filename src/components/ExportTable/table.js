import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import TableToExcel from "@linways/table-to-excel";
import moment from "moment";

const ExportTable = forwardRef((props, ref) => {
    const { exportColums, dataSource } = props;

    useImperativeHandle(ref, () => ({
        generateReport() {
            TableToExcel.convert(document.getElementById("divToPrint"), {
                name: `Weekly-report-${moment().format('YYYY-MM-DD--HH-mm-ss')}.xlsx`,
                sheet: {
                    name: "Sheet 1"
                }
            });
        },
        prientReport() {
            var printContents = document.getElementById("divToPrint").innerHTML;
            var originalContents = document.body.innerHTML;

            document.body.innerHTML = printContents;

            window.print();

            document.body.innerHTML = originalContents;
        }
    }));


    return (
        <div className='d-none'>
            <div id="divToPrint" className="export-weekreprot"
                data-cols-width="10, 30, 20, 20, 30, 20">
                <table style={{ border: "3px" }}>
                    <tr>
                        {
                            exportColums.map((data, i) => <th data-b-a-s="medium"
                                key={'th-' + i}
                                data-a-v="middle">{data.title}</th>
                            )
                        }
                    </tr>

                    {
                        dataSource?.length && dataSource.map((item, i) => <>
                            <tr key={'first-' + i}>
                                {exportColums.map((data, i) => <td>{item[data.dataIndex]}</td>)}
                            </tr>
                        </>)
                    }
                </table>
            </div>
        </div>
    )
})


export default ExportTable;