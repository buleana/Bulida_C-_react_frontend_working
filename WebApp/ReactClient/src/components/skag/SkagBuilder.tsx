import { useState, useEffect } from 'react';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import KeywordsIcon from 'src/images/general/keywords-icon.svg';
import { AdGroupType, CampaignType } from 'src/utils/types';
import { useDispatch } from 'react-redux';
import { setSkagKeywords } from 'src/redux/skagCompaign/actions';

type Props = {
  campaign: CampaignType;
};

export const SkagBuilder = ({ campaign }: Props) => {
  const defaultKeywords = isEmpty(campaign.keywordsList)
    ? ''
    : campaign.keywordsList.join('\r\n');
  const [value, setValue] = useState(defaultKeywords);
  const [keywordsCount, setKeywordsCount] = useState<number>(0);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    const keywords = value.split(/\s+/).filter((el) => !isEmpty(el));
    const adGroupList: AdGroupType[] = [];

    keywords.forEach((keyword, index) => {
      adGroupList.push({
        id: index + 1,
        adGroup: keyword,
        keywords: [keyword],
        negatives: [],
        snippetExt: [],
        searchExt: [],
        callOnlyExt: [],
        callOutExt: [],
        expTextAdExt: [],
      });
    });
    dispatch(setSkagKeywords(keywords, adGroupList));
    setKeywordsCount(keywords.length);
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      <Title>
        Build <Bold>SKAG</Bold>
      </Title>
      <KeywordsContainer>
        Keywords
        <KeywordsInput value={value} onChange={handleChange} />
        <KeywordsCounter>
          <KeywordsCounterIcon src={KeywordsIcon} />
          {`${keywordsCount} keywords`}
        </KeywordsCounter>
      </KeywordsContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.div`
  margin-bottom: 2.4rem;
  ${(props) => props.theme.text.fontType.h1};
`;

const Bold = styled.span`
  font-weight: bold;
`;

const KeywordsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  ${(props) => props.theme.text.fontType.h6};
`;

const KeywordsInput = styled.textarea`
  width: 70rem;
  height: 36rem;
  margin: 2rem 0;
  padding: 1rem;
  box-shadow: inset 0px -2px 0px rgba(192, 198, 218, 0.6),
    inset 0px -3px 0px #ffffff;
  resize: none;
  border-radius: 15px;
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.black1};
  border: 0.1rem solid ${(props) => props.theme.colors.stroke};
  ${(props) => props.theme.text.fontType.body2};

  &:focus {
    outline: none;
  }

  &::-webkit-scrollbar {
    width: 0.6rem;
    height: 10rem;
  }

  &::-webkit-scrollbar-track {
    border-radius: 0.5rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.blue2};
    opacity: 0.4;
    border-radius: 0.5rem;
  }
`;

const KeywordsCounter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4rem 1rem;
  position: absolute;
  right: 2rem;
  bottom: 3.5rem;
  border: 1px solid rgba(207, 217, 225, 0.5);
  box-sizing: border-box;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.grey4};
  ${(props) => props.theme.text.fontType.body1};
`;

const KeywordsCounterIcon = styled.img`
  margin: 0 0.9rem 0 0.2rem;
`;
