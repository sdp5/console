import * as React from 'react';
import { TableData, RowFunctionArgs } from '@console/internal/components/factory';
import { Kebab, ResourceKebab, ResourceLink, Timestamp } from '@console/internal/components/utils';
import { NamespaceModel } from '@console/internal/models';
import { modelFor, referenceFor } from '@console/internal/module/k8s';
import { EventSourceKind, EventSourceConditionTypes } from '../../../types';
import { getCondition, getConditionString } from '../../../utils/condition-utils';
import { getDynamicEventSourceModel } from '../../../utils/fetch-dynamic-eventsources-utils';

const EventSourceRow: React.FC<RowFunctionArgs<EventSourceKind>> = ({ obj }) => {
  const {
    metadata: { name, namespace, creationTimestamp, uid },
  } = obj;
  const objReference = referenceFor(obj);
  const kind = getDynamicEventSourceModel(objReference) || modelFor(objReference);
  const menuActions = [...Kebab.getExtensionsActionsForKind(kind), ...Kebab.factory.common];
  const readyCondition = obj.status
    ? getCondition(obj.status.conditions, EventSourceConditionTypes.Ready)
    : null;
  return (
    <>
      <TableData>
        <ResourceLink kind={objReference} name={name} namespace={namespace} title={uid} />
      </TableData>
      <TableData className="co-break-word" columnID="namespace">
        <ResourceLink kind={NamespaceModel.kind} name={namespace} />
      </TableData>
      <TableData columnID="ready">{(readyCondition && readyCondition.status) || '-'}</TableData>
      <TableData columnID="condition">
        {obj.status ? getConditionString(obj.status.conditions) : '-'}
      </TableData>
      <TableData>{kind.label}</TableData>
      <TableData>
        <Timestamp timestamp={creationTimestamp} />
      </TableData>
      <TableData className={Kebab.columnClass}>
        <ResourceKebab actions={menuActions} kind={objReference} resource={obj} />
      </TableData>
    </>
  );
};

export default EventSourceRow;
