import { HtmlHTMLAttributes } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

export interface TextItem {
  text: string;
}

export type ItemProps = TextItem & HtmlHTMLAttributes<HTMLDivElement>;

export interface ItemListProps extends HtmlHTMLAttributes<HTMLDivElement> {
  data?: TextItem[];
  loading?: boolean;
}

const StyledItem = styled.div`
  border: 1px solid ${(props) => props.theme.colorBorder};
  border-radius: 5px;
  color: ${(props) => props.theme.colorText};
  margin: 5px 25px;
  padding: 10px;
`;

export const Item = ({ text, ...props }: ItemProps) => <StyledItem {...props}>{text}</StyledItem>;

const StyledItemList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export function ItemList({ data, loading = false, ...props }: ItemListProps) {
  return (
    <div>
      {loading && <span>loading</span>}

      <StyledItemList {...props}>
        {!loading && data && data.map((item) => <Item key={uuid()} {...item} />)}
      </StyledItemList>
    </div>
  );
}

export default ItemList;
