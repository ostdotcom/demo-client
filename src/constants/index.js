const dataMap = [
  {
    _label: 'Direct Transfers',
    dd: 'TX',
    ddv: '1.1.0',
    d: {
      rn: 'direct transfer',
      ads: [],
      ams: ['1']
    },
    m: {
      tn: 'like',
      tt: 'user_to_user',
      td: 'Thanks for like'
    }
  },
  {
    _label: 'Pay',
    dd: 'TX',
    ddv: '1.1.0',
    d: {
      rn: 'pricer',
      ads: [],
      ams: ['1']
    },
    m: {
      tn: 'comment',
      tt: 'company_to_user',
      td: 'Thanks for comment'
    }
  }
];

const deviceMap = [
  {
    _label: 'Authorize Device',
    dd: 'AD',
    ddv: '1.1.0',
    d: {
      da: ''
    }
  },
  {
    _label: 'Revoke Device',
    dd: 'RD',
    ddv: '1.1.0',
    d: {
      da: ''
    }
  }
];

//NOT USED
//const apiRoot = process.env.REACT_APP_API_ROOT;

export { dataMap, deviceMap };
