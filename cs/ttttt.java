import java.util.Scanner;

public class random {
public static void main(String[] args) {
    Scanner input = new Scanner(System.in);

      int meot = 0, yehidot = 0, asarot = 0;
        for (int i = 0; i < 80; i++) {
          System.out.println("enter a 3 dig number");
            int num = input.nextInt();


          yehidot += num % 10;
            asarot += (num / 10) % 10;
              meot += (num / 100) % 10;
      }
            System.out.println("yehidod =" + yehidot);
              System.out.println("asarot = " + asarot);
        System.out.println("meot = " + meot);

       int count = 0;
     int num, zugi = 0, lozugi = 0;
           for (int i = 0; i < 3; i++) {
        count ++;
          System.out.println("enter num" + count);
            num = input.nextInt();
      if (num%2==0){
            zugi += num;
          }
            else {
                  lozugi += num;
        }

        }

       System.out.println("shum ha misparim a zugiim =" + zugi);
         System.out.println("shum ha misparim a lo zugiim =" + lozugi);


        Random rnd = new Random();
          for (int i = 0; i < 100; i++) {

          int num1 = (int) rnd.nextInt(900)+100;
            int num2 =(int) rnd.nextInt(900)+100;
              int num3 = (int)rnd.nextInt(900)+100;
        int avg = (num1 + num2 + num3) / 3;
      System.out.println( "the avrage is " + avg);
        if (num1 == (int) avg){
              System.out.println("yes!");
            }
              else {
            System.out.println("no!");


        int num1,num2,num3;
          for (int i = 0; i < 70; i++) {
       num1= (int) rnd.nextInt(900)+100;
         num2= (int) rnd.nextInt(900)+100;
           num3= (int) rnd.nextInt(900)+100;
             int max = Math.max(num1,Math.max(num2,num3));
               if (max>=0) {
       Double sqrt = Math.sqrt(max);
         System.out.println(" the max num is " + max);
           System.out.println("the sqrt of the max num is " + sqrt);
         }
           else{
                 System.out.println("no sqrt");
               }
             }
           }
}
}



public class random {
public static void main(String[] args) {
    Scanner input = new Scanner(System.in);

      int meot = 0, yehidot = 0, asarot = 0;
        for (int i = 0; i < 80; i++) {
          System.out.println("enter a 3 dig number");
            int num = input.nextInt();


          yehidot += num % 10;
            asarot += (num / 10) % 10;
              meot += (num / 100) % 10;
      }
            System.out.println("yehidod =" + yehidot);
              System.out.println("asarot = " + asarot);
        System.out.println("meot = " + meot);

       int count = 0;
     int num, zugi = 0, lozugi = 0;
           for (int i = 0; i < 3; i++) {
        count ++;
          System.out.println("enter num" + count);
            num = input.nextInt();
      if (num%2==0){
            zugi += num;
          }
            else {
                  lozugi += num;
        }

        }

       System.out.println("shum ha misparim a zugiim =" + zugi);
         System.out.println("shum ha misparim a lo zugiim =" + lozugi);


        Random rnd = new Random();
          for (int i = 0; i < 100; i++) {

          int num1 = (int) rnd.nextInt(900)+100;
            int num2 =(int) rnd.nextInt(900)+100;
              int num3 = (int)rnd.nextInt(900)+100;
        int avg = (num1 + num2 + num3) / 3;
      System.out.println( "the avrage is " + avg);
        if (num1 == (int) avg){
              System.out.println("yes!");
            }
              else {
            System.out.println("no!");


        int num1,num2,num3;
          for (int i = 0; i < 70; i++) {
       num1= (int) rnd.nextInt(900)+100;
         num2= (int) rnd.nextInt(900)+100;
           num3= (int) rnd.nextInt(900)+100;
             int max = Math.max(num1,Math.max(num2,num3));
               if (max>=0) {
       Double sqrt = Math.sqrt(max);
         System.out.println(" the max num is " + max);
           System.out.println("the sqrt of the max num is " + sqrt);
         }
           else{
                 System.out.println("no sqrt");
               }
             }
           }
}
}
