#!/usr/bin/env python
# coding: utf-8

# In[1]:


get_ipython().run_line_magic('matplotlib', 'inline')
import numpy as np
import pandas as pd
from IPython.core.interactiveshell import InteractiveShell
InteractiveShell.ast_node_interactivity = "all"
pd.set_option('display.max_columns', 99)
pd.set_option('display.max_rows', 250)
from plotly.offline import init_notebook_mode
init_notebook_mode(connected=True)
from tqdm import tqdm
import datetime
import plotly.express as px
import matplotlib.pyplot as plt


# In[2]:


from pathlib import Path


# In[3]:


df = pd.read_json('data-20201212.json')


# In[4]:


len(df)


# In[5]:


df.mean()


# In[6]:


df.median()


# In[7]:


[len(df.underlying.values[i]) for i in range(len(df))]


# In[8]:


df["c"] = [len(df.underlying.values[i]) for i in range(len(df))]


# In[9]:


px.histogram(
    df, x='age', histnorm='probability', color_discrete_sequence=['indianred'],
    title='age'
)


# In[10]:


px.histogram(
    df, x='c', histnorm='probability', color_discrete_sequence=['indianred'],
    title='Underlying condition count'
)


# In[11]:


px.histogram(
    df, x='sex', histnorm='probability', color_discrete_sequence=['indianred'],
    title='there is no gender'
)


# In[12]:


from collections import Counter

s = pd.Series(Counter([y for x in df['underlying'] for y in x]))
print (s)


# In[13]:


s = s.sort_values(ascending=False)


# In[14]:


s.head(150) 


# In[15]:


s.head(10).plot(kind='bar')


# In[16]:


s.head(20)


# In[17]:


len(s)


# In[18]:


s.head(250)


# In[19]:


s.values
s.index


# In[20]:


tumor = s.where(s.index.str.contains('tumor', regex=False))
tumor = tumor.dropna()
tumor
tumor.sum()


# In[21]:


daganat = s.where(s.index.str.contains('daganat', regex=False))
daganat = daganat.dropna()
daganat
daganat.sum()


# In[22]:


matches = ["tumor", "limfóma", "daganat", "rák", "lymphóma"]
kemo = pd.Series() 
matches
for d in matches: 
    tempSeries = s.where(s.index.str.contains(d, regex=False))
    tempSeries = tempSeries.dropna()
    d
    tempSeries.sum()
    kemo = pd.concat([kemo, tempSeries])
print("all of them")
kemo.sum()
kemo
    
    
    


# In[23]:


kemo.sum()


# In[24]:


retard = s.where(s.index.str.contains('retard', regex=False))
retard = retard.dropna()
retard
retard.sum()


# In[ ]:




