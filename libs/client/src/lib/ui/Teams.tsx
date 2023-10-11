import { Button } from '@prism-next/ui';
import { HtmlHTMLAttributes } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

const Wrapper = styled.div``;

export interface TeamProps extends HtmlHTMLAttributes<HTMLDivElement> {
  teams: any;
  addToReviewerTeam: any;
  removeFromReviewerTeam: any;
}

const Teams = (props: TeamProps) => {
  const { className, teams = null, addToReviewerTeam, removeFromReviewerTeam } = props;
  const isInReviewerTeam = teams && !!teams.find((t) => t.role === 'reviewer');

  return (
    <Wrapper className={className}>
      <ul>
        {teams && teams.length > 0 && teams.map((t) => <li key={uuid()}>{t.role}</li>)}
        {(!teams || teams.length === 0) && 'no teams'}
      </ul>
      <Button
        onClick={isInReviewerTeam ? removeFromReviewerTeam : addToReviewerTeam}
        type="primary"
      >
        {isInReviewerTeam ? 'Remove from' : 'Add to'} reviewer team
      </Button>
    </Wrapper>
  );
};

export default Teams;
