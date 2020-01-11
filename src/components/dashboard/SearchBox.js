import React, { Component }from 'react';

import './styles.css';
class SearchBox extends Component{

   render() {
      return (
         <div style={{
            justifySelf: 'center'
         }} className={this.props.user.type === 'Software Engineer' ? "hide__search-box" : ""}>
            <input type="text" placeholder="Search for an engineer" className="searchbox" />
         </div>
      )
   }
}

export default SearchBox