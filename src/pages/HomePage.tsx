import React from 'react';
import { Gift, Users, Shield, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const features = [
    {
      icon: Gift,
      title: 'Easy Gifting',
      description: 'Send money as gifts with custom rules and conditions. Perfect for special occasions.'
    },
    {
      icon: Users,
      title: 'Multiple Recipients',
      description: 'Create split gifts, random giveaways, or nth-person wins to engage multiple people.'
    },
    {
      icon: Shield,
      title: 'Secure & Protected',
      description: 'Password protection and secure transactions powered by Paystack ensure your gifts are safe.'
    },
    {
      icon: Zap,
      title: 'Instant Processing',
      description: 'Real-time payment updates and instant withdrawals for a seamless experience.'
    }
  ];

  const steps = [
    {
      step: '01',
      title: 'Create Gift',
      description: 'Set the amount, recipient, and any special rules for your gift.',
      icon: Gift
    },
    {
      step: '02',
      title: 'Make Payment',
      description: 'Secure payment through Paystack with multiple payment options.',
      icon: Shield
    },
    {
      step: '03',
      title: 'Share QUID',
      description: 'Share the unique gift code (QUID) with your recipient.',
      icon: Users
    },
    {
      step: '04',
      title: 'Claim & Withdraw',
      description: 'Recipients can claim and withdraw their gifts instantly.',
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-primary to-secondary p-4 rounded-2xl mx-auto w-fit mb-8">
            <Gift className="h-12 w-12 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-text-primary dark:text-text-primary-dark mb-6 animate-fade-in">
            Gifting Made
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Simple</span>
          </h1>
          
          <p className="text-xl text-text-secondary dark:text-text-secondary-dark mb-8 max-w-2xl mx-auto animate-slide-up">
            Send money as gifts with custom rules, instant withdrawals, and secure payments. 
            Perfect for birthdays, celebrations, or any special occasion.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link 
              to="/create" 
              className="btn-primary px-8 py-4 text-lg font-semibold group"
            >
              Create a Gift
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link 
              to="/claim" 
              className="btn-outline px-8 py-4 text-lg font-semibold"
            >
              Claim Gift
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface dark:bg-surface-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-text-primary-dark mb-4">
              Why Choose Quiika?
            </h2>
            <p className="text-xl text-text-secondary dark:text-text-secondary-dark max-w-3xl mx-auto">
              Experience the future of digital gifting with our secure, flexible, and user-friendly platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="card p-6 text-center hover:scale-105 transition-all duration-300 animate-fade-in group hover:shadow-strong"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-4 rounded-xl mx-auto w-fit mb-4 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300">
                  <feature.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary dark:text-text-primary-dark mb-3">
                  {feature.title}
                </h3>
                <p className="text-text-secondary dark:text-text-secondary-dark">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-bg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-text-primary-dark mb-4">
              How It Works
            </h2>
            <p className="text-xl text-text-secondary dark:text-text-secondary-dark">
              Four simple steps to create and share your gifts
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="group"
              >
                {/* Step Card */}
                <div className="card p-6 text-center h-full flex flex-col transition-all duration-300 animate-slide-up group-hover:shadow-strong group-hover:scale-105 group-hover:border-primary/20 dark:group-hover:border-primary/40"
                     style={{ animationDelay: `${index * 150}ms` }}>
                  {/* Step Number with Icon */}
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="bg-gradient-to-br from-primary to-secondary text-white p-3 rounded-xl font-bold text-lg min-w-12">
                      {step.step}
                    </div>
                    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-2 rounded-lg group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300">
                      <step.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-text-primary dark:text-text-primary-dark mb-3">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary dark:text-text-secondary-dark flex-1">
                      {step.description}
                    </p>
                  </div>

                  {/* Hover Indicator */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface dark:bg-surface-dark">
        <div className="max-w-4xl mx-auto text-center">
          <div className="card p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-text-primary-dark mb-6">
              Ready to Start Gifting?
            </h2>
            <p className="text-xl text-text-secondary dark:text-text-secondary-dark mb-8">
              Join thousands of users who trust Quiika for their digital gifting needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/create" 
                className="btn-primary px-8 py-4 text-lg font-semibold group"
              >
                Create Your First Gift
                <Gift className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
              </Link>
            </div>

            {/* Improved responsive checkmark section */}
            <div className="flex flex-col sm:flex-row items-center justify-center mt-8 gap-4 sm:gap-6 text-sm text-text-secondary dark:text-text-secondary-dark">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                <span>Instant Withdrawals</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};