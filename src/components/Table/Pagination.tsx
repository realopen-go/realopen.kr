import React, { memo, useCallback } from "react";
import OrigPagination from "react-bootstrap/Pagination";
import styled from "@emotion/styled";

const StyledPagination = styled(OrigPagination)`
  justify-content: center;
`;

const PageItem: React.FC<{
  onChangePage: (page: number) => void;
  page: number;
}> = memo(({ onChangePage, page }) => {
  const handleClick = useCallback(() => {
    onChangePage(page);
  }, [onChangePage, page]);
  return (
    <OrigPagination.Item onClick={handleClick}>{page}</OrigPagination.Item>
  );
});

const Pagination: React.FC<{
  currentPage: number;
  lastPage: number;
  onChangePage: (page: number) => void;
}> = ({ currentPage, lastPage, onChangePage }) => {
  const handleClickFirstItem = useCallback(() => {
    onChangePage(1);
  }, [onChangePage]);

  const handleClickPrevItem = useCallback(() => {
    onChangePage(currentPage - 1);
  }, [currentPage, onChangePage]);

  const handleClickNextItem = useCallback(() => {
    onChangePage(currentPage + 1);
  }, [currentPage, onChangePage]);

  const handleClickLastItem = useCallback(() => {
    onChangePage(lastPage);
  }, [lastPage, onChangePage]);

  const renderNextPageItems = () => {
    const items = [];
    for (let i = currentPage + 1; i <= lastPage && i - currentPage < 4; i++) {
      items.push(
        <PageItem onChangePage={onChangePage} page={i}>
          {i}
        </PageItem>
      );
    }

    return items;
  };

  const renderPrevPageItems = () => {
    const items = [];
    for (let i = currentPage - 1; i >= 1 && currentPage - i < 4; i--) {
      items.unshift(
        <PageItem onChangePage={onChangePage} page={i}>
          {i}
        </PageItem>
      );
    }

    return items;
  };

  return (
    <StyledPagination>
      {currentPage > 1 && (
        <>
          <OrigPagination.First onClick={handleClickFirstItem} />
          <OrigPagination.Prev onClick={handleClickPrevItem} />
          {renderPrevPageItems()}
        </>
      )}

      <OrigPagination.Item active>{currentPage}</OrigPagination.Item>
      {currentPage < lastPage && (
        <>
          {renderNextPageItems()}
          <OrigPagination.Next onClick={handleClickNextItem} />
          <OrigPagination.Last onClick={handleClickLastItem} />
        </>
      )}
    </StyledPagination>
  );
};

export default Pagination;
