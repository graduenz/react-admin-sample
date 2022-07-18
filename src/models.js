import * as React from 'react';
import {
    useRecordContext,
    useGetOne,
    List,
    Datagrid,
    TextField,
    TextInput,
    ReferenceField,
    ReferenceInput,
    SelectInput,
    EditButton,
    Edit,
    SimpleForm,
    Create,
    SimpleList,
    ReferenceManyField,
    TabbedShowLayout,
    Tab,
} from 'react-admin';

const modelFilters = [
    <TextInput
        label="Nome"
        source="name"
    />,
    <ReferenceInput source="makeId" label="Marca" reference="makes">
        <SelectInput optionText="name" />
    </ReferenceInput>,
];

export const ModelList = props => (
    <List filters={modelFilters} {...props}>
        <Datagrid>
            <ReferenceField source="makeId" reference="makes">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="name" label="Nome" />
            <EditButton />
        </Datagrid>
    </List>
);

const ModelTitle = () => {
    const record = useRecordContext();
    const { data: make } = useGetOne('makes', { id: record.makeId });
    return `${make?.name} ${record.name}`;
};

export const ModelEdit = () => (
    <Edit title={<ModelTitle />}>
        <TabbedShowLayout>
            <Tab label="Model">
                <SimpleForm>
                    <TextInput source="name" />
                    <ReferenceInput source="makeId" label="Marca" reference="makes">
                        <SelectInput optionText="name" />
                    </ReferenceInput>
                </SimpleForm>
            </Tab>
            <Tab label="Trims" path="trims">
                <ReferenceManyField
                    reference="trims"
                    target="modelId"
                    sort={{ field: "year", order: "DESC" }}
                    >
                    <SimpleList
                        primaryText={record => `(${record.year}) ${record.name}`}
                        dense={true}
                    />
                </ReferenceManyField>
            </Tab>
        </TabbedShowLayout>
    </Edit>
);

export const ModelCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" />
            <ReferenceInput source="makeId" label="Marca" reference="makes">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);