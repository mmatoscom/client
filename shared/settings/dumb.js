// @flow

import React from 'react'
import {Box, Text} from '../common-adapters'

import UpdateEmail from './email'
import UpdatePassphrase from './passphrase'
import PaymentForm from './payment'
import Landing from './landing'
import SettingsNav from './nav'
import DeleteMe from './delete'
import DeleteConfirm from './delete-confirm'
import Notifications from './notifications'
import InviteGenerated from './invite-generated'
import PlanDetails from './plan-details'
import Invites from './invites'

import type {DumbComponentMap} from '../constants/types/more'

const updateEmailBase = {
  email: 'party@mypla.ce',
  isVerified: true,
  onChangeEmail: () => console.log('onChangeEmail'),
  onSave: () => console.log('onSave'),
  onResendConfirmationCode: null,
}

const updateEmailMap: DumbComponentMap<UpdateEmail> = {
  component: UpdateEmail,
  mocks: {
    'Normal': updateEmailBase,
    'Normal - No Email': {
      ...updateEmailBase,
      isVerified: false,
      email: null,
    },
    'Not Verified - No Email': {
      ...updateEmailBase,
      isVerified: false,
    },
    'Resend Confirmation': {
      ...updateEmailBase,
      onResendConfirmationCode: () => console.log('onResendConfirmationCode'),
    },
  },
}

const updatePassphraseBase = {
  onChangeCurrentPassphrase: currentPassphrase => console.log('onChangeCurrentPassphrase', currentPassphrase),
  onChangeNewPassphrase: newPassphrase => console.log('onChangeNewPassphrase', newPassphrase),
  onChangeNewPassphraseConfirm: newPassphraseConfirm => console.log('onChangeNewPassphraseConfirm', newPassphraseConfirm),
  onChangeShowPassphrase: showPassphrase => console.log('onChangeShowPassphrase', showPassphrase),
  currentPassphrase: 'swordfish',
  newPassphrase: 'open sesame',
  newPassphraseConfirm: 'open sesame',
  showTyping: false,
  errorMessage: null,
  newPassphraseError: null,
  newPassphraseConfirmError: null,
  canSave: true,
  onBack: () => console.log('onBack'),
  onSave: () => console.log('onSave'),
  onForgotPassphrase: () => console.log('onForgotPassphrase'),
}

const updatePassphraseMap: DumbComponentMap<UpdatePassphrase> = {
  component: UpdatePassphrase,
  mocks: {
    'Normal - Empty': {
      ...updatePassphraseBase,
      currentPassphrase: '',
      newPassphrase: '',
      newPassphraseConfirm: '',
      canSave: false,
    },
    'Normal': updatePassphraseBase,
    'Normal - Show Typing': {
      ...updatePassphraseBase,
      showTyping: true,
    },
    'Error - Wrong Passphrase': {
      ...updatePassphraseBase,
      errorMessage: 'Wrong current passphrase. Please try again.',
      currentPassphrase: '',
      canSave: false,
    },
    'Error - New Passphrase Requirements': {
      ...updatePassphraseBase,
      newPassphraseError: 'Your new passphrase must have minimum 12 characters.',
      newPassphraseConfirm: '',
    },
    'Error - New Passphrase Mismatch': {
      ...updatePassphraseBase,
      newPassphraseConfirmError: 'Passphrase confirmation does not match.',
    },
  },
}

const paymentBase = {
  onChangeCardNumber: () => console.log('onChangeCardNumber'),
  onChangeName: () => console.log('onChangeName'),
  onChangeExpiration: () => console.log('onChangeExpiration'),
  onChangeSecurityCode: () => console.log('onChangeSecurityCode'),
  cardNumber: '0001 0002 0003 4242',
  name: 'Jessica Jones',
  expiration: '01/2017',
  securityCode: '123',
  onBack: () => console.log('onBack'),
  onSubmit: () => console.log('onSubmit'),
}

const paymentFormMap: DumbComponentMap<PaymentForm> = {
  component: PaymentForm,
  mocks: {
    'Normal - Empty': {
      ...paymentBase,
      cardNumber: '',
      name: '',
      expiration: '',
      securityCode: '',
    },
    'Normal': paymentBase,
    'Normal - Error': {
      ...paymentBase,
      errorMessage: 'Please check your payment details.',
    },
  },
}

const planBase = {
  onUpgrade: l => console.log('onUpgrade to', l),
  onDowngrade: l => console.log('onDowngrade to', l),
  onInfo: l => console.log('onInfo for', l),
  selectedLevel: 'Basic',
  freeSpace: '5GB',
  freeSpacePercentage: 0.5,
  lowSpaceWarning: false,
  onChangePaymentInfo: () => console.log('onChangePaymentInfo'),
  paymentInfo: null,
}

const accountBase = {
  email: 'party@mypla.ce',
  isVerified: true,
  onChangeEmail: () => console.log('onChangeEmail'),
  onChangePassphrase: () => console.log('onChangePassphrase'),
}

const landingBase = {
  plan: planBase,
  account: accountBase,
}

const goldBase = {
  ...landingBase,
  plan: {
    ...planBase,
    selectedLevel: 'Gold',
    lowSpaceWarning: true,
    freeSpacePercentage: 0.9,
    paymentInfo: {
      name: 'Jessica Jones',
      last4Digits: '1337',
      isBroken: false,
    },
  },
}

const landingMap: DumbComponentMap<Landing> = {
  component: Landing,
  mocks: {
    'Normal': landingBase,
    'Normal - Not Verified email': {...landingBase, account: {...landingBase.account, isVerified: false}},
    'Gold Plan': goldBase,
    'Gold Plan - Broken Payment': {
      ...goldBase,
      plan: {
        ...goldBase.plan,
        paymentInfo: {
          ...goldBase.plan.paymentInfo,
          isBroken: true,
        },
      },
    },
  },
}

const fillerContent = <Box style={{flex: 1, backgroundColor: 'grey'}} />

const settingsNavBase = {
  content: fillerContent,
  items: [{
    text: 'Your Account',
    onClick: () => { console.log('clicked your account') },
    badgeNumber: 1,
    selected: true,
  }, {
    text: 'Invitations (15)',
    onClick: () => { console.log('clicked ivites') },
  }, {
    text: 'Notifications',
    onClick: () => { console.log('clicked notifications') },
  }, {
    text: 'Delete me',
    onClick: () => { console.log('clicked delete me') },
  }],
}

const bannerTextStyle = {
  alignSelf: 'center',
  textAlign: 'center',
  flex: 1,
}

const settingsNavMap: DumbComponentMap<SettingsNav> = {
  component: SettingsNav,
  mocks: {
    'Normal': settingsNavBase,
    'Normal - Good Banner': {
      ...settingsNavBase,
      bannerElement: <Text type='BodySmallSemibold' style={bannerTextStyle} backgroundMode='Success'>Success! You have just upgraded to the Gold plan. </Text>,
      bannerType: 'green',
    },
    'Normal - Bad Banner': {
      ...settingsNavBase,
      bannerElement: <Text type='BodySmallSemibold' style={bannerTextStyle} backgroundMode='HighRisk'>Your Visa **** 4242 has broken. Please update your preferred payment method.</Text>,
      bannerType: 'red',
    },
  },
}

const deleteMeMap: DumbComponentMap<DeleteMe> = {
  component: DeleteMe,
  mocks: {
    'Normal': {
      onDelete: () => console.log('onDelete clicked'),
      onRevokeCurrentDevice: () => console.log('onRevokeCurrentDevice clicked'),
      parentProps: {
        style: {
          height: 500,
          display: 'flex',
        },
      },
    },
  },
}

const deleteConfirmMap: DumbComponentMap<DeleteConfirm> = {
  component: DeleteConfirm,
  mocks: {
    'Normal': {
      onDeleteForever: () => console.log('onDeleteForever clicked'),
      onCancel: () => console.log('onCancel clicked'),
      username: 'chris',
      allowDeleteForever: true,
      setAllowDeleteAccount: allow => console.log('setAllowDeleteAccount', allow),
      parentProps: {
        style: {
          height: 500,
          display: 'flex',
        },
      },
    },
  },
}

const commonSettings = {
  settings: [
    {
      name: 'follow',
      subscribed: true,
      description: 'when someone follows me',
    },
    {
      name: 'twitter_friend_joined',
      subscribed: true,
      description: 'when someone I follow on Twitter joins',
    },
    {
      name: 'filesystem_attention',
      subscribed: true,
      description: 'when the Keybase filesystem needs my attention',
    },
    {
      name: 'newsletter',
      subscribed: true,
      description: 'Keybase news, once in a great while',
    },
  ],
  unsubscribedFromAll: false,
  allowSave: true,
  allowEdit: true,
  onRefresh: () => console.log('onRefresh'),
  onSave: () => console.log('onSave'),
  onToggle: (name: string) => console.log('on toggle', name),
  onToggleUnsubscribeAll: () => console.log('on subscribe all'),
}

const notificationsMap: DumbComponentMap<Notifications> = {
  component: Notifications,
  mocks: {
    'Normal': {
      ...commonSettings,
    },
    'UnsubAll': {
      ...commonSettings,
      unsubscribedFromAll: true,
    },
  },
}

const commonInvite = {
  link: 'keybase.io/inv/9999999999',
  parentProps: {
    style: {
      height: 500,
      display: 'flex',
    },
  },
  onClose: () => console.log('onClose clicked'),
}

const inviteGeneratedMap: DumbComponentMap<InviteGenerated> = {
  component: InviteGenerated,
  mocks: {
    'Normal': {
      ...commonInvite,
      email: 'user@gmail.com',
    },
    'No email': {
      ...commonInvite,
      email: null,
    },
  },
}

const creditCardNoPast = {
  type: 'credit-card-no-past',
  onAddCreditCard: () => { console.log('onAddCreditCard') },
}

const creditCardWithPast = {
  type: 'credit-card-with-past',
  cardInfo: 'Visa **** 4242',
  onPayWithSavedCard: () => { console.log('onPayWithSavedCard') },
  onUpdateCard: () => { console.log('onPayWithSavedCard') },
}

const applePay = {
  type: 'apple-pay',
  onPayWithCardInstead: () => { console.log('onPayWithCardInstead') },
}

const planDetailsMap: DumbComponentMap<PlanDetails> = {
  component: PlanDetails,
  mocks: {
    'Credit Card No Past': {
      plan: 'Basic',
      paymentOption: creditCardNoPast,
    },
    'Credit Card With Past': {
      plan: 'Gold',
      paymentOption: creditCardWithPast,
    },
    'Apple Pay': {
      plan: 'Friend',
      paymentOption: applePay,
    },
  },
}

const invitesBase = {
  inviteEmail: 'tcook@apple.com',
  inviteMessage: 'Hey Tim! I heard you like end-to-end encryption...',
  showMessageField: true,
  emailError: false,
  pendingInvites: [
    {
      type: 'pending-email',
      id: '123456',
      created: 1469565223000,
      email: 'tcook@apple.com',
    },
    {
      type: 'pending-url',
      id: '123457',
      created: 1469566223000,
      url: 'keybase.io/inv/9999999999',
    },
  ],
  acceptedInvites: [
    {
      id: '223456',
      created: 1469565223000,
      username: 'malgorithms',
      fullname: 'Chris Coyne',
      avatar: 'https://keybase.io/chris/picture',
      currentlyFollowing: false,
      trackerState: 'normal',
    },
    {
      id: '223457',
      created: 1469566223000,
      username: 'cecileb',
      fullname: 'Cécile Boucheron',
      avatar: 'https://keybase.io/cecileb/picture',
      currentlyFollowing: true,
      trackerState: 'normal',
    },
    {
      id: '223458',
      created: 1469567223000,
      username: 'chromakode',
      fullname: 'Max Goodman',
      avatar: 'https://keybase.io/chromakode/picture',
      currentlyFollowing: false,
      trackerState: 'error',
    },
  ],
  onChangeInviteEmail: inviteEmail => console.log('onChangeInviteEmail', inviteEmail),
  onChangeInviteMessage: inviteMessage => console.log('onChangeInviteMessage', inviteMessage),
  onClickUser: username => console.log('onClickUser', username),
  onReclaimInvitation: invitationId => console.log('onReclaimInvitation', invitationId),
  onGenerateInvitation: () => console.log('onGenerateInvitation'),
  parentProps: {
    style: {
      width: 504,
    },
  },
}

const invitesMap: DumbComponentMap<Invites> = {
  component: Invites,
  mocks: {
    'Normal - Empty': {
      ...invitesBase,
      inviteEmail: '',
      inviteMessage: '',
      showMessageField: false,
      pendingInvites: [],
      acceptedInvites: [],
    },
    'Normal - Empty Message': {
      ...invitesBase,
      inviteMessage: '',
    },
    'Normal': invitesBase,
    'Normal - Email Error': {
      ...invitesBase,
      emailError: true,
    },
  },
}

export default {
  UpdateEmail: updateEmailMap,
  UpdatePassphrase: updatePassphraseMap,
  PaymentForm: paymentFormMap,
  Landing: landingMap,
  SettingsNav: settingsNavMap,
  DeleteMe: deleteMeMap,
  DeleteConfirm: deleteConfirmMap,
  Notifications: notificationsMap,
  InviteGenerated: inviteGeneratedMap,
  PlanDetails: planDetailsMap,
  Invites: invitesMap,
}
