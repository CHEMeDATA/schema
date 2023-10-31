#include <stdio.h>
#include <math.h>

double lorentzian(double x, double mu, double FWHM) {
      return (1 / 3.141592653589793) * ((0.5 * FWHM) / ((x) * (x) + (0.5 * FWHM) * (0.5 * FWHM)));
}
double gaussian(double x, double mu, double FWHM) {
    return 1 / (0.42466090014400953434  * FWHM * sqrt(2 * 3.141592653589793)) * exp(-((x) * (x)) / (2 * 0.42466090014400953434  * 0.42466090014400953434 * FWHM * FWHM));
}
double gaussianSigma(double x, double mu, double sigma) {
    return 1 / (sigma * sqrt(2.0 * 3.141592653589793)) * exp(-(x * x) / (2.0 * sigma * sigma));
}
double integral_approximation(double mu, double sigma, double lower_limit, double upper_limit, int num_intervals) {
    double delta_x = (upper_limit - lower_limit) / num_intervals;
    double x, sum = 0.0;
    double top = 0.0;
    double previous = 0.0;
    for (x = lower_limit + 0.5 * delta_x; x < upper_limit; x += delta_x) {
        double curVal = gaussian(x, mu, sigma);
        if (curVal > top) {top = curVal;}
        if ((previous > top / 2.0 )&& (curVal < top / 2.0)) {
            printf("half height at x =  %.4f \n", x);}
        previous = curVal;
        sum +=  curVal * delta_x;
    }

    return sum;
}

int main() {
    double mu = 0;       // Mean of the Gaussian distribution
    double FWHM = 1.0;
    // double sigma = FWHM / (2 * sqrt( 2 * log(2)));    // Standard deviation of the Gaussian distribution
    double lower_limit = -1000;  // Lower limit of the integral
    double upper_limit = 1000;   // Upper limit of the integral
    int num_intervals = 10000000; // Number of intervals for approximation

    double integral_result = integral_approximation(mu, FWHM, lower_limit, upper_limit, num_intervals);
    printf("The integral of the Gaussian function from %.2f to %.2f is approximately: %.6f\n", lower_limit, upper_limit, integral_result);
    //printf("1 / (2 * sqrt( 2 * log(2))) =  %.20f \n", 1.0 / (2 * sqrt( 2 * log(2))));

    return 0;
}
