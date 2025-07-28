<?php

namespace Modules\Adjustment\DataTables;

use Modules\Adjustment\Entities\Adjustment;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Yajra\DataTables\Html\Editor\Editor;
use Yajra\DataTables\Html\Editor\Fields;
use Yajra\DataTables\Services\DataTable;

class AdjustmentsDataTable extends DataTable
{

    public function dataTable($query) {
        return datatables()
            ->eloquent($query)->with('adjustedProducts')
            ->addColumn('action', function ($data) {
                return view('adjustment::partials.actions', compact('data'));
            })
            ->addColumn('reference', function ($data) {
                return $data->reference;
            })
            ->addColumn('adjusted_products_count', function ($data) {
                return $data->adjusted_products_count;
            })
            ->addColumn('note', function ($data) {
                return $data->note;
            })
            ->rawColumns(['action']);
    }

    public function query(Adjustment $model) {
        return $model->newQuery()->withCount('adjustedProducts');
    }

    public function html() {
        return $this->builder()
            ->setTableId('adjustments-table')
            ->columns($this->getColumns())
            ->minifiedAjax();
    }

    protected function getColumns() {
        return [
            Column::make('date')
                ->className('text-center align-middle'),

            Column::make('reference')
                ->className('text-center align-middle'),

            Column::make('adjusted_products_count')
                ->title('Products')
                ->className('text-center align-middle'),

            Column::make('note')
                ->title('Note')
                ->className('text-justify align-middle'),

            Column::computed('action')
                ->exportable(false)
                ->printable(false)
                ->className('text-center align-middle'),

            Column::make('created_at')
                ->visible(false)
        ];
    }

    protected function filename(): string {
        return 'Adjustments_' . date('YmdHis');
    }
}
