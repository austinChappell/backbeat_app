import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';

import data from '../assets/data';
import GeneralAPI from '../assets/APIs/generalAPI';

const generalAPI = new GeneralAPI();
const { searchUsers } = generalAPI;
const { defaultProfilePhoto } = data;

const propTypes = {
  loadMessages: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

class MemberSearch extends Component {
  state = {
    results: [],
    searchValue: '',
  };

  changeText = searchValue => {
    clearTimeout(this.stopQuery);
    this.setState({ searchValue }, () => {
      this.stopQuery = setTimeout(() => {
        if (this.state.searchValue.trim()) {
          searchUsers(this.state.searchValue, this.props.token, this.setResults);
        } else {
          this.setResults([]);
        }
      }, 200);
    });
  };

  clearSearchBar = () => {
    this.setState({ searchValue: '' });
  };

  setResults = results => {
    console.log('RESULTS', results);
    this.setState({ results });
  };

  render() {
    return (
      <View>
        <SearchBar
          cancelButtonTitle="Cancel"
          lightTheme
          round
          onCancel={this.clearSearchBar}
          onChangeText={this.changeText}
          value={this.state.searchValue}
        />
        <List>
          {this.state.results.map((member, index) => {
            const avatarUrl = member.profile_image_url
              ? member.profile_image_url
              : defaultProfilePhoto;
            const fullName = `${member.first_name} ${member.last_name}`;
            return (
              <ListItem
                key={index}
                roundAvatar
                hideChevron
                onPress={() => this.props.loadMessages(member.id, fullName)}
                avatar={{ uri: avatarUrl }}
                title={fullName}
              />
            );
          })}
        </List>
      </View>
    );
  }
}

MemberSearch.propTypes = propTypes;

export default MemberSearch;
