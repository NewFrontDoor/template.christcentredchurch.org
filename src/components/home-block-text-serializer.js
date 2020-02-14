import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import styled from '@emotion/styled';
import {Link} from 'react-router-dom';
import Form from './form';
import GridBlock from './grid-block';
import Card from './card-grid-item';
import HorizontalCard from './horizontal-card-grid-item';
import Overlay from './overlay-grid-item';

const BlockContentInt = styled(BlockContent)(`line-height: 26px;`);

function CustomStyleSerializer({children}) {
  return <p>{children}</p>;
}

function AnchorSerializer({children, mark}) {
  return <span id={mark.id}>{children}</span>;
}

function GridBlockSerializer({node: {blocks, columns, style}}) {
  return (
    <GridBlock
      items={blocks}
      columns={
        (columns === undefined) | null
          ? `repeat(auto-fit, minmax(200px, 1fr))`
          : `repeat(${columns}, 1fr)`
      }
      columnRawValue={(columns === undefined) | null ? 1 : columns}
      gap="20px"
      style={style}
      marginBottom="0"
      renderProp={(data, style) =>
        style === 'card' ? (
          <Card {...data} />
        ) : style === 'overlay' ? (
          <Overlay {...data} />
        ) : style === 'horizontal' ? (
          <HorizontalCard {...data} />
        ) : (
          ''
        )
      }
    />
  );
}

function FormSerializer({node: {header, id, body, fields}}) {
  return <Form header={header} id={id} description={body} fields={fields} />;
}

function InternalLinkSerializer({mark, children}) {
  return <Link to={`/${mark.slug}`}>{children}</Link>;
}

export default function HomeBlock({blocks}) {
  return (
    <BlockContentInt
      blocks={blocks}
      serializers={{
        types: {
          p: CustomStyleSerializer,
          form: FormSerializer,
          gridblock: GridBlockSerializer
        },
        marks: {
          anchor: AnchorSerializer,
          internalLink: InternalLinkSerializer
        }
      }}
    />
  );
}
