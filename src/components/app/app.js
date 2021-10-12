import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeersList from '../employeers-list/employeers-list';
import EmployeersAddForm from '../employeers-add-form/employeers-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'John C.', salary: 800, increase: false, rise: true, id: 1},
                {name: 'Alex M.', salary: 3000, increase: true, rise: false, id: 2},
                {name: 'Carl W.', salary: 5000, increase: false, rise: false, id: 3}
            ],
            term: '',
            filter: 'all'
        }
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            /* const index = data.findIndex(elem => elem.id === id); */

            /* const before = data.slice(0, index);
            const after = data.slice(index + 1);

            const newArr = [...before, ...after]; */
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (e, name, salary) => {
        e.preventDefault();
        this.setState(({data}) => {
            if (name !== '' && salary !== '' && name.length > 2 && salary.length > 3){
                const newItem = {name: name, 
                    salary: salary, 
                    increase: false,
                    rise: false, 
                    id: Math.floor(Math.random() * (99999 - 1 + 1)) + 1};
                const newData = data.slice(0);

                const newArr = [...newData, newItem];
                console.log(newArr)
                name = "";
                salary = "";
                return {
                    data: newArr
                }
            }
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    /* onToggleIncrease = (id) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, increase: !item.increase}
                }
                return item;
            })
        }))
    }

    onToggleRise = (id) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, rise: !item.rise}
                }
                return item;
            })
        }))
    } */

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state;
        const employees = data.length,
              increased = data.filter(item => item.increase === true).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);
        
        return (
            <div className="app">
                <AppInfo employees={employees}
                    increased={increased}/>
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
    
                <EmployeersList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>
                <EmployeersAddForm 
                    addItem={this.addItem}/>
            </div>
    
        );
    }
}

export default App;