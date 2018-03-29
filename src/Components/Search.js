import React, {Component} from 'react';

//getProfile
class Search extends Component{
    submit(event){
        event.preventDefault();
        let input = this.refs.username.value;
        this.props.searchProfile(input);
        this.refs.username.value = ''
    }
    render(){
        return(
            <div className="search-box">
                <form onSubmit={this.submit.bind(this)}>
                    <label>
                        <input type="search" ref="username" placeholder="type username and press enter"/>
                    </label>
                </form>
            </div>
        )
    }
}
export default Search;