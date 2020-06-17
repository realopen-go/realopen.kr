import React, { useCallback, memo } from "react";
import BootstrapPagination from "react-bootstrap/Pagination";

const PageFirstItem: React.FC<{ onClick: (arg0: number) => void }> = memo(
  ({ onClick }) => {
    const handleClickPage = useCallback(() => {
      onClick(1);
    }, [onClick]);

    return <BootstrapPagination.First onClick={handleClickPage} />;
  }
);

const PageItem: React.FC<{
  active: boolean;
  onClick: (arg0: number) => void;
  page: number;
}> = memo(({ active = false, onClick, page }) => {
  const handleClickPage = useCallback(() => {
    onClick(page);
  }, [onClick, page]);

  return (
    <BootstrapPagination.Item active={active} onClick={handleClickPage}>
      {page}
    </BootstrapPagination.Item>
  );
});

const PageLastItem: React.FC<{
  lastPage: number;
  onClick: (arg0: number) => void;
}> = memo(({ lastPage, onClick }) => {
  const handleClickPage = useCallback(() => {
    onClick(lastPage);
  }, [lastPage, onClick]);

  return <BootstrapPagination.Last onClick={handleClickPage} />;
});

const PageNextItem: React.FC<{
  onClick: (arg0: number) => void;
  page: number;
}> = memo(({ onClick, page }) => {
  const handleClickPage = useCallback(() => {
    onClick(page + 1);
  }, [onClick, page]);

  return <BootstrapPagination.Next onClick={handleClickPage} />;
});

const PagePrevItem: React.FC<{
  onClick: (arg0: number) => void;
  page: number;
}> = memo(({ onClick, page }) => {
  const handleClickPage = useCallback(() => {
    onClick(page - 1);
  }, [onClick, page]);

  return <BootstrapPagination.Prev onClick={handleClickPage} />;
});

const Pagination: React.FC<{
  currentPage: number;
  lastPage: number;
  onClickPage: (arg0: number) => void;
}> = ({ currentPage, lastPage, onClickPage }) => {
  return (
    <BootstrapPagination>
      <PageFirstItem onClick={onClickPage} />
      <PagePrevItem onClick={onClickPage} page={currentPage} />

      <PageItem active onClick={onClickPage} page={currentPage} />

      <PageNextItem onClick={onClickPage} page={currentPage} />
      <PageLastItem lastPage={lastPage} onClick={onClickPage} />
    </BootstrapPagination>
  );
};

export default Pagination;
