import React, { useState, useRef, useEffect } from 'react';
import ProductsTable from '@/components/ProductsTable';
import {
  IProductsTableRef,
  IProductItem,
} from '@/components/ProductsTable/interface';
import { getProductReviewList } from '@/api';
import { ColumnsType } from 'antd/lib/table';
import { Button } from 'antd';
import styles from './index.less';
import { useHistory } from 'umi';

const ProductReview = () => {
  const history = useHistory();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(1);
  const [data, setData] = useState<Array<IProductItem>>([]);

  const productsTableRef = useRef<IProductsTableRef>();

  const columns: ColumnsType<IProductItem> = [
    {
      title: '操作',
      align: 'center',
      width: 140,
      fixed: 'right',
      render: (_, record) => {
        return (
          <div className={styles['btn-wrapper']}>
            <Button type="primary" size="small" className={styles['btn']}>
              通过
            </Button>
            <Button
              type="primary"
              size="small"
              danger
              className={styles['btn']}
            >
              拒绝
            </Button>
            <Button
              type="primary"
              size="small"
              className={styles['btn']}
              onClick={() =>
                history.push(
                  `/server/addProduct?productId=${record.productId}&review=1`,
                )
              }
            >
              查看详情
            </Button>
          </div>
        );
      },
    },
  ];

  const getData = async () => {
    productsTableRef.current?.setLoading(true);
    try {
      const { list, total } = await getProductReviewList({ page, pageSize });
      setData(list);
      setTotal(total);
    } catch (e) {}
    productsTableRef.current?.setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    if (page === 1 && pageSize !== 10) {
      getData();
    } else {
      setPage(1);
    }
  }, [pageSize]);

  return (
    <ProductsTable
      columns={columns}
      page={page}
      pageSize={pageSize}
      cref={productsTableRef}
      tableData={data}
      total={total}
      pageChange={page => setPage(page)}
      pageSizeChange={pageSize => setPageSize(pageSize)}
      changeTable={getData}
    />
  );
};

export default ProductReview;
