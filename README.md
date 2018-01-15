# React Challenge: User list

Made with:
* [React](https://reactjs.org).
* [Axios](https://github.com/axios/axios).

## Getting started

You can use either npm or [yarn](https://yarnpkg.com/).

```sh
> yarn install
> yarn start
```

## Table Component

This component renders a responsive table. Just provide an array with objects as data, and a column config to let it know what and how to render each item.
### Basic usage

```js
// Initial data
 const data = [{id: 1, name:'Johnn'}, {id: 2, name:'Mark'}, {id: 3, name:'Rachel'}];
 // Table configuration
 const config = [{ key: 'name', title: 'Name' }];
 
 <Table data={data} columns={config} />
 ```

### Props

```js
<Table
    // Data to be displayed
    // Must be an array of objects 
    data={[
        {id: 1, name: 'Johnn', username: 'johnn_11'}, 
        {id: 2, name: 'Mark', username: 'big_mark'}, 
        {id: 3, name: 'Rachel', username: 'rach_93'}
    ]}

    // Columns to be displayed on the table
    columns={[
        ...,
        {
            // Data to display from an item
            key: 'username',
            // Column title
            title: 'Github Username',
            // [Optional] Function to render the item  
            // It will render a plain string if a function is not provided
            renderItem: val => <a href={`https://github.com/${val}`}>{val}</a>,
        }
    ]}

    // [Optional] Function to get unique key for each row from an item
    // It's encouraged to provide a function to ensure rows key uniqueness
    keyExtractor={item => item.id}

    // [Optional] A title to be displayed on top of the table
    title='Awesome Developers'

    // [Optional] Custom text to be displayed when there's no data
    placeholder='We are hiring!'
    />
```