import { createSelector } from 'reselect';
import { createSelector as createOrmSelector } from 'redux-orm';
import { schema } from './reducers/models';

const ormSelector = state => state.orm;


export const getAllTransfers = createSelector(
    ormSelector,
    createOrmSelector(schema, session => (session.Transfer.all().toRefArray()))
);

export const getDepositingTransfers = createSelector(
    ormSelector,
    createOrmSelector(schema, session => (session.Transfer.filter(transfer => transfer.status === 'depositing').toRefArray()))
);

export const getReceivingTransfers = createSelector(
    ormSelector,
    createOrmSelector(schema, session => (session.Transfer.filter(transfer => transfer.status === 'receiving').toRefArray()))
);

export const getCancellingTransfers = createSelector(
    ormSelector,
    createOrmSelector(schema, session => (session.Transfer.filter(transfer => transfer.status === 'cancelling').toRefArray()))
);


export const getTransfersForActiveAddress = createSelector(
    [(state) => state.web3Data.address,
     getAllTransfers
    ], (address, transfers) => {
	return transfers.filter(a => a.senderAddress === address);
    }
);
