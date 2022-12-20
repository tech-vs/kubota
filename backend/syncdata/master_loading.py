import pandas as pd
from syncdata.models import (
    MasterLoading,
)


def insert_data(df : pd.DataFrame):
    master_loading_list = []
    for data in df.to_dict('records'):
        data_dict = {k.lower(): v for k, v in data.items()}
        master_loading_list.append(
            MasterLoading(**data_dict)
        )
    MasterLoading.objects.bulk_create(master_loading_list)
