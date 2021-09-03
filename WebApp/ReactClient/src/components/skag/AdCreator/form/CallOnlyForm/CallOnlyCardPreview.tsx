import styled from 'styled-components';
import { CallOnlyAdType } from 'src/utils/types';
import CallIcon from 'src/images/general/call-icon.svg';

type Props = {
  item: CallOnlyAdType;
};

export const CallOnlyCardPreview = ({ item }: Props) => {
  return (
    <AdPreviewContainer>
      <TitleContainer>
        <AdIcon src={CallIcon} />
        <Title>
          {`${item.headlineOne} | ${item.headlineTwo} ${item.phoneNumber}`}
        </Title>
      </TitleContainer>
      <Link>{item.finalUrl}</Link>
      <Description>{item.descriptionOne}</Description>
      <Description>{item.descriptionTwo}</Description>
    </AdPreviewContainer>
  );
};

const AdPreviewContainer = styled.div`
  display: flex;
  width: 55%;
  max-width: 55rem;
  cursor: pointer;
  height: fit-content;
  flex-direction: column;
  padding: 1.7rem;
  box-sizing: border-box;
  border-radius: 1rem;
  border: 0.1rem solid ${(props) => props.theme.colors.grey5};
  background-color: ${(props) => props.theme.colors.lightBlue2};
`;

const TitleContainer = styled.span`
  display: flex;
  align-items: center;
`;

const Title = styled.span`
  color: ${(props) => props.theme.colors.blue1};
  ${(props) => props.theme.text.fontType.body3};
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Link = styled.span`
  padding: 0.2rem 0;
  color: ${(props) => props.theme.colors.link};
  ${(props) => props.theme.text.fontType.link};
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Description = styled.span`
  color: ${(props) => props.theme.colors.black1};
  ${(props) => props.theme.text.fontType.link};
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AdIcon = styled.img`
  width: 2.2rem;
  height: 2.2rem;
  margin-right: 0.8rem;
`;
