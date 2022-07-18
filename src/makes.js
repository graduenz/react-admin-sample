import * as React from 'react';
import {
    useRecordContext,
    List,
    Datagrid,
    TextField,
    TextInput,
    ReferenceManyField,
    SingleFieldList,
    ChipField,
    EditButton,
    Edit,
    SimpleForm,
    Create,
} from 'react-admin';

const makeFilters = [
    <TextInput
        label="Nome"
        source="name"
    />,
];

export const MakeList = props => (
    <List filters={makeFilters} {...props}>
        <Datagrid sx={{
            '& .column-name': { width: '200px' },
        }}>
            <TextField source="name" label="Nome" />
            <ReferenceManyField label="Modelos" reference="models" target="makeId">
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceManyField>
            <EditButton />
        </Datagrid>
    </List>
);

const MakeTitle = () => {
    const record = useRecordContext();
    return record.name;
};

export const MakeEdit = () => (
    <Edit title={<MakeTitle />}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);

export const MakeCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);