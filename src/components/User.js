import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class User extends Component {
  render() {
    const { login, avatarUrl, name } = this.props.user

    return (
      <div className="User">
        <Link to={`/${login}`}>
          <img alt="avatar" src={avatarUrl} width="72" height="72" />
          <h3>
            {login} {name && <span>({name})</span>}
          </h3>
        </Link>
      </div>
    )
  }
}

User.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    name: PropTypes.string
  }).isRequired
}
