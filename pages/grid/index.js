import React, { Component } from 'react'
import autobind from 'autobind-decorator'

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import cloneDeep from 'lodash/cloneDeep'
import isNil from 'lodash/isNil'


let id = 1;
function createNewRowData() {
    let newData = { make: `new${id}`, model: "newModel", price: 0 };
    id++;
    return newData;
}

function printResult(res) {
    console.log("---------------------------------------");
    if (res.add) {
      res.add.forEach(function(rowNode) {
        console.log("Added Row Node", rowNode);
      });
    }
    if (res.remove) {
      res.remove.forEach(function(rowNode) {
        console.log("Removed Row Node", rowNode);
      });
    }
    if (res.update) {
      res.update.forEach(function(rowNode) {
        console.log("Updated Row Node", rowNode);
      });
    }
  }

@autobind
class GridPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [
                { headerName: "Make", field: "make", checkboxSelection: true },
                { headerName: "Model", field: "model" },
                { headerName: "Price", field: "price" }
            ],
            rowData: [
                { make: "Toyota", model: "Celica", price: 35000 },
                { make: "Ford", model: "Mondeo", price: 32000 },
                { make: "Porsche", model: "Boxter", price: 72000 }
            ]
        }
    }

    onAddRow() {
        let addIndex = -1;

        (this.gridApi.getSelectedNodes() || []).forEach(item => {
            addIndex = item.rowIndex;
        })

        if ( addIndex > -1 ) {
            let newItem = createNewRowData();
            let res = this.gridApi.updateRowData({
                addIndex,
                add: [ newItem ]
            });
            printResult(res);
        } else {
            alert('아이템이 선택되지 않았습니다.');
        }
    }

    onRemoveRow() {
        let removeRow = this.gridApi.getSelectedRows()

        if ( removeRow.length ) {
            let res = this.gridApi.updateRowData({
                remove: removeRow
            });
            printResult(res);
        } else {
            alert('아이템이 선택되지 않았습니다.');
        }
    }

    move(direction) {
        let selectedRow = this.gridApi.getSelectedRows();
        let selectedNodes = this.gridApi.getSelectedNodes();
        let currentIndex = selectedNodes[0].rowIndex;
        let lastIndex = 0;

        // 전체 row의 index
        this.gridApi.forEachNode(node => { lastIndex += 1 });
        
        if ( !selectedRow.length ) {
            alert('row가 선택되지 않았습니다.');
            return ;
        }

        if ( direction === 'down' ) {
            if ( currentIndex < (lastIndex-1) ) {
                this.gridApi.updateRowData({
                    addIndex: currentIndex + 2,
                    add: selectedRow
                });
                this.gridApi.selectIndex(currentIndex + 2)
                this.gridApi.updateRowData({
                    remove: selectedRow
                });
            } else {
                alert('rowIndex가 리스트의 마지막 index를 넘을 수 없습니다.');
            }
        } else if ( direction === 'up' ) {
            if ( currentIndex > 0 ) {
                this.gridApi.updateRowData({
                    remove: selectedRow
                });
                this.gridApi.updateRowData({
                    addIndex: currentIndex - 1,
                    add: selectedRow
                });
                this.gridApi.selectIndex(currentIndex - 1);
            } else {
                alert('rowIndex가 0보다 작을 수 없습니다.');
            }
        } else {
            alert('방향설정이 잘못되었습니다.');
        }
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        console.log(this.gridApi)
    }

    onRowSelected(evt) {
        console.log('onRowSelected', this.gridApi.getSelectedNodes());
    }

    onSelectionChanged(evt) {
        console.log('onSelectionChanged', evt)
    }
    
    render() {
        return (
            <div 
                className="ag-theme-balham"
                style={{ height: '500px', width: '600px' }} 
            >
                <button onClick={ this.onAddRow }>Add Row</button>
                <button onClick={ this.onRemoveRow }>remove Row</button>
                <button onClick={ () => this.move('down') }>move down</button>
                <button onClick={ () => this.move('up') }>move up</button>
                <AgGridReact
                    columnDefs={ this.state.columnDefs }
                    rowData={ this.state.rowData }
                    onGridReady={ this.onGridReady }
                    onRowSelected={ this.onRowSelected }
                    onSelectionChanged={ this.onSelectionChanged }>
                </AgGridReact>
            </div>
        );
    }
}

export default GridPage;