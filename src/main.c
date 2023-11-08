#include <stdio.h>
#include <math.h>
#include <stdbool.h>
double lorentzian(double x, double mu, double FWHM) {
    //  return (1 / 3.141592653589793) * ((0.5 * FWHM) / ((x) * (x) + (0.5 * FWHM) * (0.5 * FWHM)));
    //  return (1 / (3.141592653589793 * 0.5 * FWHM)) / ((x/(FWHM/2.0)) * (x/(FWHM/2.0)) + 1);
      return 0.63661977236758138243 / (FWHM * ((x/(FWHM/2.0)) * (x/(FWHM/2.0)) + 1));
     
}
double gaussian(double x, double mu, double FWHM) {
    // 1 / (2*SQRT(2*LN(2))) = 0.42466090014400953434
    // return 1.0 / (0.42466090014400953434  * FWHM * sqrt(2 * 3.141592653589793)) * exp(-((x) * (x)) / (2 * 0.42466090014400953434  * 0.42466090014400953434 * FWHM * FWHM));
    //return (0.636619772367581 / 0.939437278699651) / (0.42466090014400953434  * FWHM * sqrt(2 * 3.141592653589793)) * exp(-((x) * (x)) / (2 * 0.42466090014400953434  * 0.42466090014400953434 * FWHM * FWHM));
   
   // return (0.636619772367581 / 0.939437278699651) / (0.42466090014400953434  * FWHM * sqrt(2 * 3.141592653589793)) * exp(-((x) * (x)) / (0.36067376022224084675 * FWHM * FWHM));
    return (0.63661977236758138243 / FWHM) * exp(-x * x / (0.36067376022224084675 * FWHM * FWHM));
}

double lorGau(double x, double mu, double FWHM, double kurtosis) {
return (0.63661977236758138243 / FWHM) * (kurtosis / (FWHM * ((x/(FWHM/2.0)) * (x/(FWHM/2.0)) + 1)) + (1.0 - kurtosis) * exp(-x * x / (0.36067376022224084675 * FWHM * FWHM)));
}

/*
double gaussianSigma(double x, double mu, double sigma) {
    return 1 / (sigma * sqrt(2.0 * 3.141592653589793)) * exp(-(x * x) / (2.0 * sigma * sigma));
}
*/
double genLorentzian(double x, double mu, double FWHM, double kurtosis) {


    //const double a =  (1.0 - kurtosis) * (1 / 3.141592653589793) * ((0.5 * FWHM) / ((x) * (x) + (0.5 * FWHM) * (0.5 * FWHM)));
   // const double lu = ((x / (0.5 * FWHM)) * (x / (0.5 * FWHM)) + 1);
  ///  const double squ = x/(FWHM/2.0);
   /// const double u = squ * squ;
  ///  const double lu = u + 1;
  ///  const double a = (1.0 - kurtosis)  / lu;
  ///  const double b = kurtosis * (1.0 + 0.5 * u)  / ( lu + u * u);
    //return (a + b) * (1 / (3.141592653589793 * 0.5 * FWHM));


    return (0.63661977236758138243 / FWHM) * ((1.0 - kurtosis) / (x/(FWHM/2.0) * x/(FWHM/2.0) + 1)  +  kurtosis * (1.0 + 0.5 * x/(FWHM/2.0) * x/(FWHM/2.0)) / ( (x/(FWHM/2.0) * x/(FWHM/2.0) + 1) + x/(FWHM/2.0) * x/(FWHM/2.0) * x/(FWHM/2.0) * x/(FWHM/2.0)));

    //const double b = 
// 		val = ( (1.0 - kurtosis)/lx + kurtosis*(1.0+0.5*x)/(lx + x*x) );
// 		val = ( (1.0 - kurtosis)/lx + kurtosis*(1.0+0.5*x*x)/(lx + x*x*x*x) );
// 		val = ( (1.0 - kurtosis)/(1 + x*x) + kurtosis*(1.0+0.5*x*x)/(1 + x*x + x*x*x*x) );

    //return a + b; 
}

double integral_approximationL(double mu, double sigma, double lower_limit, double upper_limit, int num_intervals) {
    double delta_x = (upper_limit - lower_limit) / num_intervals;
    double x;
    double sum = 0.0;
    double top = 0.0;
    double previous = 0.0;
    bool status = true;
    for (x = lower_limit + 0.5 * delta_x; x < upper_limit; x += delta_x) {
        double curVal = lorentzian(x, mu, sigma);
        if (curVal > top) {top = curVal;}
        if ((previous > top * 0.5 )&& (curVal <= top * 0.5 )) {
            if (fabs(x - 0.5) >= 0.0001) {status = false;
                printf("0.5 found x =  %.15f \n", x);
            }
        }
        if ((previous > top * 0.25)&& (curVal <= top * 0.25)) {
            if (fabs(x - 0.8661) > 0.0001) {status = false;
                printf("0.8661 found x =  %.15f \n", x);
            }
        }
        if ((previous > top * 0.75)&& (curVal <= top * 0.75)) {
            if (fabs(x - 0.2887) > 0.0001) { status = false;
                printf("0.2887 found x =  %.15f \n", x);
            }
        }
        previous = curVal;
        sum +=  curVal * delta_x;
    }
    const double I0 = lorentzian(0, mu, sigma);
    printf("Val for x = 0 :  %.15f =  2 / pi = %.15f \n", I0, 2.0 / 3.141592653589793);
    if (fabs(I0 - 2.0 / 3.141592653589793) > 0.00001) status = false;
    if (! status) printf("PROBLEM WITH lorentzian  *****************************************\n");
    return sum;
}
double integral_approximationG(double mu, double sigma, double lower_limit, double upper_limit, int num_intervals) {
    double delta_x = (upper_limit - lower_limit) / num_intervals;
    double x;
    double sum = 0.0;
    double top = 0.0;
    double previous = 0.0;
    bool status = true;
    for (x = lower_limit + 0.5 * delta_x; x < upper_limit; x += delta_x) {
        double curVal = gaussian(x, mu, sigma);
        if (curVal > top) {top = curVal;}
        if ((previous > top * 0.5 )&& (curVal <= top * 0.5 )) {
            if (fabs(x - 0.5) > 0.0001) {status = false;
                printf("0.5 found x =  %.15f \n", x);
            }
        }
        if ((previous > top * 0.25)&& (curVal <= top * 0.25)) {
            if (fabs(x - 0.7073) > 0.0001) {status = false;
                printf("0.7073 found x =  %.15f \n", x);
            }

        }
        if ((previous > top * 0.75)&& (curVal <= top * 0.75)) {
            if (fabs(x - 0.3223) > 0.0001) { status = false;
                printf("0.3223 found x =  %.15f \n", x);
            }
        }
        previous = curVal;
        sum +=  curVal * delta_x;
    }
    const double I0 = gaussian(0, mu, sigma);
    printf("Val for x = 0 :  %.15f =  2 / pi = %.15f \n", I0, 2.0 / 3.141592653589793);
    if (fabs(I0 - 2.0 / 3.141592653589793) > 0.00001) status = false;
    if (! status) printf("PROBLEM WITH  lorentzian  *****************************************\n");
    return sum;
}

double integral_approximationLG(double mu, double FWHM, double lower_limit, double upper_limit, int num_intervals, double balance) {
    double delta_x = (upper_limit - lower_limit) / num_intervals;
    double x;
    double sum = 0.0;
    double top = 0.0;
    double previous = 0.0;
    bool status = true;
    for (x = lower_limit + 0.5 * delta_x; x < upper_limit; x += delta_x) {
        double curVal =  lorGau(x, mu, FWHM, balance);
        if (curVal > top) {top = curVal;}
        if (fabs(balance - 0.5) < 0.0001) {
            if ((previous > top * 0.5 )&& (curVal <= top * 0.5 )) {
                if (fabs(x - 0.5) > 0.0001) {status = false;
                    printf("0.5 found x =  %.15f \n", x);
                }
            }
            if ((previous > top * 0.25)&& (curVal <= top * 0.25)) {
                if (fabs(x - 0.762699892251530) > 0.0001) {status = false;
                    printf("0.762699892251530 found x =  %.15f \n", x);
                }

            }
            if ((previous > top * 0.75)&& (curVal <= top * 0.75)) {
                if (fabs(x - 0.305699892251580) > 0.0001) { status = false;
                    printf(" 0.305699892251580 found x =  %.15f \n", x);
                }
            }
        }
        if (fabs(balance - 0.75) < 0.0001) {
            if ((previous > top * 0.5 )&& (curVal <= top * 0.5 )) {
                if (fabs(x - 0.5) > 0.0001) {status = false;
                    printf("0.5 found x =  %.15f \n", x);
                }
            }
            if ((previous > top * 0.25)&& (curVal <= top * 0.25)) {
                if (fabs(x - 0.805499892251525 ) > 0.0001) {status = false;
                    printf("0.805499892251525 found x =  %.15f \n", x);
                }

            }
            if ((previous > top * 0.75)&& (curVal <= top * 0.75)) {
                if (fabs(x - 0.297299892251581) > 0.0001) { status = false;
                    printf("0.297299892251581 found x =  %.15f \n", x);
                }
            }
        }
        previous = curVal;
        sum +=  curVal * delta_x;
    }
    const double I0 =  lorGau(0.0, mu, FWHM, balance);
    printf("integral_approximationLG Val for x = 0 :  %.15f =  2 / pi = %.15f \n", I0, 2.0 / 3.141592653589793);
    if (fabs(I0 - 2.0 / 3.141592653589793) > 0.00001) status = false;
    if (! status) printf("PROBLEM WITH  integral_approximationLG  *****************************************\n");
    return sum;
}
double integral_approximationGeneralized(double mu, double sigma, double lower_limit, double upper_limit, int num_intervals, double balance) {
    double delta_x = (upper_limit - lower_limit) / num_intervals;
    double x, sum = 0.0;
    double top = 0.0;
    double previous = 0.0;
    bool status = true;
    for (x = lower_limit + 0.5 * delta_x; x < upper_limit; x += delta_x) {
        double curVal = genLorentzian(x, mu, sigma, balance);

        if (fabs(balance - 0.0) < 0.0001) { // pure lorentzian
            if ((previous > top * 0.5 )&& (curVal <= top * 0.5 )) {
                if (fabs(x - 0.5) >= 0.0001) {status = false;
                    printf("0.5 found x =  %.15f \n", x);
                }
            }
            if ((previous > top * 0.25)&& (curVal <= top * 0.25)) {
                if (fabs(x - 0.8661) > 0.0001) {status = false;
                    printf("0.8661 found x =  %.15f \n", x);
                }
            }
            if ((previous > top * 0.75)&& (curVal <= top * 0.75)) {
                if (fabs(x - 0.2887) > 0.0001) { status = false;
                    printf("0.2887 found x =  %.15f \n", x);
                }
            }
        }
        if (fabs(balance - 0.5) < 0.0001) {
            if ((previous > top * 0.5 )&& (curVal <= top * 0.5 )) {
                if (fabs(x - 0.5) >= 0.0001) {status = false;
                    printf("0.5 found x =  %.15f \n", x);
                }
            }
            if ((previous > top * 0.25)&& (curVal <= top * 0.25)) {
                if (fabs(x - 0.806099892251525) > 0.0001) {status = false;
                    printf("0.806099892251525 found x =  %.15f \n", x);
                }
            }
            if ((previous > top * 0.75)&& (curVal <= top * 0.75)) {
                if (fabs(x - 0.310299892251579) > 0.0001) { status = false;
                    printf("0.310299892251579 found x =  %.15f \n", x);
                }
            }
        }
         if (fabs(balance - 1.0) < 0.0001) {
            if ((previous > top * 0.5 )&& (curVal <= top * 0.5 )) {
                if (fabs(x - 0.5) >= 0.0001) {status = false;
                    printf("0.5 found x =  %.15f \n", x);
                }
            }
            if ((previous > top * 0.25)&& (curVal <= top * 0.25)) {
                if (fabs(x - 0.758899892251530) > 0.0001) {status = false;
                    printf("0.758899892251530 found x =  %.15f \n", x);
                }
            }
            if ((previous > top * 0.75)&& (curVal <= top * 0.75)) {
                if (fabs(x - 0.329499892251577) > 0.0001) { status = false;
                    printf("0.329499892251577 found x =  %.15f \n", x);
                }
            }
        }
        if (fabs(balance - 0.25) < 0.0001) {
            if ((previous > top * 0.5 )&& (curVal <= top * 0.5 )) {
                if (fabs(x - 0.5) >= 0.0001) {status = false;
                    printf("0.5 found x =  %.15f \n", x);
                }
            }
            if ((previous > top * 0.25)&& (curVal <= top * 0.25)) {
                if (fabs(x - 0.834499892251522) > 0.0001) {status = false;
                    printf("0.834499892251522 found x =  %.15f \n", x);
                }
            }
            if ((previous > top * 0.75)&& (curVal <= top * 0.75)) {
                if (fabs(x - 0.299699892251581) > 0.0001) { status = false;
                    printf("0.299699892251581 found x =  %.15f \n", x);
                }
            }
        }
         if (fabs(balance - 0.75) < 0.0001) {
            if ((previous > top * 0.5 )&& (curVal <= top * 0.5 )) {
                if (fabs(x - 0.5) >= 0.0001) {status = false;
                    printf("0.5 found x =  %.15f \n", x);
                }
            }
            if ((previous > top * 0.25)&& (curVal <= top * 0.25)) {
                if (fabs(x - 0.780899892251528) > 0.0001) {status = false;
                    printf("0.780899892251528 found x =  %.15f \n", x);
                }
            }
            if ((previous > top * 0.75)&& (curVal <= top * 0.75)) {
                if (fabs(x - 0.320299892251578) > 0.0001) { status = false;
                    printf("0.320299892251578 found x =  %.15f \n", x);
                }
            }
        }
        if (curVal > top) {top = curVal;}
        if ((previous > top / 2.0 )&& (curVal < top / 2.0)) {
            printf("half height at x =  %.4f \n", x);}
        previous = curVal;
        sum +=  curVal * delta_x;
    }
    const double I0 = genLorentzian(0, mu, sigma, balance);
    printf("integral_approximationLG Val for x = 0 :  %.15f =  2 / pi = %.15f \n", I0, 2.0 / 3.141592653589793);
    if (fabs(I0 - 2.0 / 3.141592653589793) > 0.00001) status = false;
    if (! status) printf("PROBLEM WITH  integral_approximationLG  *****************************************\n");
    return sum;
}

int main() {
    double mu = 0;       // Mean of the Gaussian distribution
    double FWHM = 1.0;
    // double sigma = FWHM / (2 * sqrt( 2 * log(2)));    // Standard deviation of the Gaussian distribution
    double lower_limit = -1000;  // Lower limit of the integral
    double upper_limit = 1000;   // Upper limit of the integral
    int num_intervals = 10000000; // Number of intervals for approximation

    double integral_resultG = integral_approximationG(mu, FWHM, lower_limit, upper_limit, num_intervals);
    printf("The integral of the Gaussian function from %.2f to %.2f is approximately: %.6f\n", lower_limit, upper_limit, integral_resultG);
    //printf("1 / (2 * sqrt( 2 * log(2))) =  %.20f \n", 1.0 / (2 * sqrt( 2 * log(2))));
    printf("\n");
    printf("\n");

    double integral_resultL = integral_approximationL(mu, FWHM, lower_limit, upper_limit, num_intervals);
    printf("The integral of the Lorentzian function from %.2f to %.2f is approximately: %.6f\n", lower_limit, upper_limit, integral_resultL);
    //printf("1 / (2 * sqrt( 2 * log(2))) =  %.20f \n", 1.0 / (2 * sqrt( 2 * log(2))));
    printf("\n");
    printf("\n");

    for (double balance = 0.0 ; balance < 1.01; balance += 0.25) {
        double integral_result = integral_approximationLG(mu, FWHM, lower_limit, upper_limit, num_intervals, balance);
        printf("The integral of the Lorentzian/Gaussian %.2f function from %.2f to %.2f is approximately: %.6f\n", balance, lower_limit, upper_limit, integral_result);
        //printf("1 / (2 * sqrt( 2 * log(2))) =  %.20f \n", 1.0 / (2 * sqrt( 2 * log(2))));
        printf("\n");
    }
    printf("\n");

    for (double balance = 0.0 ; balance < 1.01; balance += 0.25) {
        double integral_result = integral_approximationGeneralized(mu, FWHM, lower_limit, upper_limit, num_intervals, balance);
        printf("The integral of the generalized Lorentizan %.2f function from %.2f to %.2f is approximately: %.6f\n", balance, lower_limit, upper_limit, integral_result);
        //printf("1 / (2 * sqrt( 2 * log(2))) =  %.20f \n", 1.0 / (2 * sqrt( 2 * log(2))));
        printf("\n");
    }
    printf("\n");
    printf ("2 * 0.42466090014400953434  * 0.42466090014400953434 = %.20f \n", 2 * 0.42466090014400953434  * 0.42466090014400953434);
    printf ("(0.636619772367581 / 0.939437278699651) / (0.42466090014400953434 * sqrt(2 * 3.141592653589793)) = %.20f \n", (0.636619772367581 / 0.939437278699651) / (0.42466090014400953434 * sqrt(2 * 3.141592653589793)));
    printf ("(1 / (3.141592653589793 * 0.5)) = %.20f \n", (1 / (3.141592653589793 * 0.5)));
   
   
   
    return 0;
}
