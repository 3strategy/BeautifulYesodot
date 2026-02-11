---
layout: page
---

```cs

//Q1 
//start:21:24
public static int Special(int[] arr)
{
 int a=arr[0];
 int b=arr[1];
 if(a!=b)
 {
  for (int i=2;i<arr.Length; i++)
  {
    if(arr[i]==b)
      return a;
  }
  return b;
 }
 else //a==b
 {
   for(int i=2;i<arr.Length; i++)
   {
    if(arr[i]!=a)
      return arr[i];  
   }
 }
 
 return -1; // not supposed to get here
}
//end:  21:28

//start: 21:28
//Q2
public static int[] Uniques(int[] arr)
{
 int prev=arr[0];
 int[] ar2 = new int[arr.Length];
 ar2[0]=prev; 
 int ind =1;
 foreach (var n in arr)
 {
   if(n != prev)
   {
     prev = n;
     ar2[ind++] = n;
   }
 }
 int[] ar3 = new int[ind];
 for(int i = 0; i < ind; i++)
  ar3[i] = ar2[i];

 return ar3;
}
//end: 21:33

//start: 21:33
//Q3
public static string Interesting(Product[] arr)
{
 Product lowP = null;
 foreach(Product p in arr)
 {
   if(lowP==null && p.GetPrice()>=10)
    lowP = p;
   else if(p.GetPrice() >= 10 && p.GetPrice() < lowP.GetPrice())
    lowP = p;
 }
 
 return lowP.GetName();
}
//end: 21:37

//start: 21:37

//Q4

public Phone(string maker)
{
 this.maker = maker;
 color = "red"; 
 price = 2000;
 weight = 548;
}
public void SetPrice(int price)
{
 this.price = price;
}

public bool IsSamePrice(Phone other)
{
  return price == other.price;
}
//end: 21:40

//start: 21:40 maakav end 2145=================

```
