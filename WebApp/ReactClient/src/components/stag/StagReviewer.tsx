import styled from 'styled-components';

export const StagReviewer = () => {
  return (
    <Container>
      <Title>Reviewer</Title>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  margin-bottom: 2.4rem;
  ${(props) => props.theme.text.fontType.h1};
`;
