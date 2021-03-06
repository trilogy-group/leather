import Immutable from 'immutable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { centsToDollars } from '../data/utils';
import { connect } from 'react-redux';
import {
  selectActiveAccount,
  selectAllAccountsSorted,
} from '../selectors/accounts';

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {
    activeAccount: selectActiveAccount(state),
    accounts: selectAllAccountsSorted(state),
  };
};

class AccountListContainer extends Component {
  static get propTypes() {
    return {
      accounts: PropTypes.instanceOf(Immutable.List),
      activeAccount: PropTypes.instanceOf(Immutable.Map),
      channel: PropTypes.object,
    };
  }

  render() {
    const accounts = this.props.accounts.map(account => {
      let classes;
      if (this.props.activeAccount) {
        const isActive =
          account.get('id') === this.props.activeAccount.get('id');
        classes = isActive ? 'active' : '';
      }
      return (
        <li key={account.get('id')}>
          <Link
            className={classes}
            style={{ paddingLeft: '24px' }}
            to={`/${account.get('id')}/transactions`}
          >
            {account.get('name')} (#{account.get('id')})
            <span
              style={{ color: '#9b9b9b', display: 'block', marginTop: '2px' }}
            >
              {centsToDollars(account.get('balance_current'))}
            </span>
          </Link>
        </li>
      );
    });
    return (
      <div>
        <p className="menu-label" style={{ marginLeft: '24px' }}>
          Accounts
        </p>
        <ul className="menu-list">{accounts}</ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AccountListContainer
);
